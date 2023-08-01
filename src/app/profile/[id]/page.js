"use client"
import MainProfile from '@/Components/MainProfile'
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import {useState, useEffect} from 'react'
import Skeleton from '@/Components/Skeleton';

export default function page({params}) {
    const [quotes, setQuotes] = useState([]);
    const [currentUser, setCurrentUser] = useState({})
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
  const { data: session, status } = useSession();
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/quotes`);
          const data = await response.json();
          setQuotes(data);
        };
        const fetchUser = async () => {
          const response = await fetch(`/api/users/getUser/${params?.id}`);
          const User = await response.json();
          setCurrentUser(User)
        };
        if (status === "authenticated" && session?.user.id){
            fetchPosts()
            fetchUser()
        }
      }, [session?.user.id]);
      if (status === "loading") {
        return <div><Skeleton type="userProfile"/></div>;
      }
  return (
    <div className="w-full flex justify-center items-center">
        <MainProfile data={quotes} name={userName} section={`${userName}'s`} image={currentUser.image}/>
    </div>
  )
}
