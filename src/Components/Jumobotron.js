"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";
import React,{useEffect, useState} from "react";
import { signIn, getProviders } from "next-auth/react";
export default function Jumbotron() {
  const router = useRouter();
  const [providers, setProviders] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setUpProviders = async()=>{
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
  const continueWithGoogle = async (id) =>{
    setLoading(true);
    try {
      await signIn(id);
      await setLoginState(true)
      console.log(loginState)
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  return (
    <section className="bg-white dark:bg-black h-full w-full absolute top-0 left-0 flex flex-col justify-evenly items-center">
      <div className="w-full flex sm:justify-start justify-center">
      <i className="fa-solid fa-hippo text-white text-6xl p-10"></i>
      </div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We Give You The Potential To Grow
          </h1>
          <p className="text-sm font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Sign in
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Learn more
          </a>
        </div>
        <div className="w-full">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  continueWithGoogle(provider.id)
                }}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-white hover:bg-gray-400 sm:w-fit w-full"
              >
                {loading ? "": <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/225px-Google_%22G%22_Logo.svg.png"
                  alt="logo"
                  width={20}
                  height={20}
                  style={{height:"auto", width:"auto"}}
                  className="mr-4"/>}
                  {!loading ? "Continue with Google": "Redirecting..."}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}
