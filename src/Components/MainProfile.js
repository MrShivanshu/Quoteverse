"use client"
import {useEffect, useRef} from "react";
import Quotes from "@/Components/Quotes";
import "../styles/profile.css"
import { usePathname } from "next/navigation";

export default function MainProfile({
  handleLogOut,
  name,
  image,
  data,
  section,
}) {
  const pathname = usePathname();
  const profileNavRef = useRef();
  useEffect(() => {
    profileNavRef.current.addEventListener('click',(e)=>{
        const button = e.target.closest("div");
        if (!button) return;
        const calcLeft = button.offsetLeft;
      if (calcLeft < 164) {
        profileNavRef.current.style.setProperty('--left', calcLeft + "px")
      }
      const calcWidth = button.offsetWidth / profileNavRef.current.offsetWidth;
      if (calcWidth < 1) {
        profileNavRef.current.style.setProperty('--width', calcWidth)
      }
    });
  }, [])
  
  return (
    <div className="w-5/6 h-full text-white flex flex-col justify-center items-center gap-2">
      <div className="w-full h-14">
          <div className="w-full h-14 fixed bg-black sm:hidden border-b-2 border-gray-800 top-0 left-0">
            <div className="flex items-center justify-between w-full px-8 h-full">
            <div>{name}</div>
            <div><i className="fa-solid fa-bars text-white"></i></div>
            </div>
          </div>
      </div>
      <div className="h-fit border-b-2 border-l-indigo-700 w-full flex flex-col sm:flex-row gap-4 justify-evenly py-8 sm:pb-20 border-gray-700">
        <div className="flex gap-6 items-center justify-start w-fit">
          <div className="border-2 rounded-full border-gray-500 p-1 w-fit ">
            <img
              src={image}
              alt="d"
              className="sm:h-32 sm:w-32 h-14 w-14 rounded-full"
            />
          </div>
          <div className="block sm:hidden">
            <div className="flex gap-8">
              <div>@{name}</div>
              <div className="flex gap-2 items-center justify-center hover:cursor-pointer " onClick={handleLogOut}>
                <i className="fa-solid fa-pen-to-square" ></i>
              </div>
            </div>
            <div className="flex sm:gap-8 gap-4">
              <div>0 quote</div>
              <div>0 quote</div>
              <div>0 quote</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="hidden gap-8 sm:flex">
            <div>@{name}</div>
            <div className="flex gap-2 items-center justify-center hover:cursor-pointer ">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
          <div className="hidden gap-8 sm:flex">
            <div>0 quote</div>
            <div>0 quote</div>
            <div>0 quote</div>
          </div>
          <div>
            <strong>{name}</strong>
            <p>
              🎶🎶Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
              porro.
            </p>
          </div>
        </div>
      </div>
      <div id="profile-navigation" className="flex gap-8 w-fit items-center justify-center" ref={profileNavRef}>
        <div className="">Quotes</div>
        {pathname === "/profile" ? <>
        <div>Saved</div>
        <div>Discard</div>
        </> : ""}
      </div>
      <div className="w-full">
        <div className="">
          <Quotes posts={data} section={section} />
        </div>
      </div>
    </div>
  );
}
{
  /* <i className="fa-solid fa-right-from-bracket text-xl"></i> */
}
