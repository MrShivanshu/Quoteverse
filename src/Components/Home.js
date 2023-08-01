"use client"
import React,{useEffect, useState} from 'react'
import SideProfile from './SideProfile'
import Quotes from './Quotes'
import {useSession } from "next-auth/react";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false)
  const { data: session } = useSession();

  const fetchPosts = async () => {
    try {
      setDataLoading(true)
      const response = await fetch("/api/quote");
      const data = await response.json();
      Array.isArray(data) ? setAllPosts (data.reverse()) : setAllPosts([data])
      setDataLoading(false)
    } catch (error) {
      console.log("failed to get quotes",error)
    }
    
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
    <div className='text-white box-border flex justify-end bg-black'>
      <div className="w-full sm:pl-20 p-2" id='quotes-section'>
        <Quotes posts={allPosts} section={"Trending"} dataLoading={dataLoading}/>
      </div>
      <div className="sm:block hidden" id='side-profile' style={{minWidth:"30%"}}>
        <SideProfile name={session?.user.name} image={session?.user.image} userId={session?.user._id}/>
      </div>
    </div>
    </>
  )
}
