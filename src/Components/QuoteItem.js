"use client"
import React,{useEffect, useState} from 'react';
import {useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function QuoteItem({description, title, creator, date}) {
  const { data: session } = useSession();
  const [quoteTime, setQuoteTime] = useState('');
  const router = useRouter();
  const [quoteDate, setQuoteDate] = useState('');
  const handleUserIdClick = ()=>{
    console.log(creator)
    if (creator._id === session?.user.id) return router.push(`/profile`);
    router.push(`/profile/${creator._id}?name=${creator.username}`);
  }
  useEffect(() => {
    const jsonDate = new Date(parseFloat(date)); //converting to date
    setQuoteDate(jsonDate.getMonth() +
    1 +
    "-" +
    jsonDate.getDate() +
    "-" +
    jsonDate.getFullYear())
    setQuoteTime(jsonDate.getHours() +
    ":" +
    jsonDate.getMinutes())
}, [])
  return (
    <div className='text-white w-full min-h-full border-2 border-gray-400 sm:rounded-3xl rounded-xl flex flex-col items-center justify-between'>
      <div className='w-full sm:h-20 h-12 border-b-2 border-gray-800 px-4 flex items-center justify-start gap-4'>
        <img src={creator.image} alt="d" className='sm:h-12 sm:w-12 h-8 w-8 rounded-full object-contain'/>
        <span >
        <button className='hover:underline' id={creator._id} onClick={handleUserIdClick}>@{creator.username}</button>
        <p className='text-gray-500 sm:block hidden'>{creator.username}</p>
        </span>
      </div>
      <div className='w-full max-h-1/2 border2 border-gray-800 sm:p-4 p-2 overflow-hidden' id='quote-item'>
      <span className='sm:text-xl text-lg'><span className='text-green-300 text-base'>Quote:</span>&nbsp; {title}</span><p className='text-gray-400 text-justify sm:text-lg text-sm'>{description}</p>
      </div>
      <div className='w-full h-10 border-t-2 border-gray-800 px-4 flex items-center justify-between'>
        <span className='text-sm sm:text-lg'>Date : {quoteDate}</span>
        <span className='text-sm sm:text-lg'>{quoteTime}</span>
      </div>
      </div>
  )
}
