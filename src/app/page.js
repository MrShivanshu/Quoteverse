'use client'
import Jumbotron from '@/Components/Jumobotron'
import React from 'react'
import { useSession } from "next-auth/react";
import Home from '@/Components/Home';
import Loading from '../Components/Loading'

export default function page() {
  const { data: session, status } = useSession();
  return (
    <div id='quote-area' className='w-full'>
    {status === "authenticated" ? <Home/> :status === "loading" ? <Loading/> :
    <Jumbotron/>}
    </div>
  )
}
