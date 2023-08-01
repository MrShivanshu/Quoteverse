"use client"
import {useEffect,useState} from 'react'
import UserIds from './UserIds'
import Link from 'next/link';
import Skeleton from './Skeleton';

export default function SideProfile({name, image}){
  const [dataLoading, setDataLoading] = useState(false)
    const [allUsers, setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      setDataLoading(true)
      const response = await fetch("/api/users/allUsers");
      const data = await response.json();
      Array.isArray(data) ? setUsers(data) : setUsers([data])
      setDataLoading(false)
    } catch (error) {
      console.log("failed to get quotes",error)
    }
    
  };
  useEffect(() => {
    fetchPosts();
  }, []);
    
  return (
    <div className="h-screen flex flex-col justify-start gap-14 px-8 py-20  border-l-2 border-gray-700">
      {!dataLoading ? <div className='flex gap-4 items-center justify-start w-full'>
        <img src={image} alt="d" className='h-16 w-16 rounded-full object-contain'/>
        <span>
        <Link className='hover:underline text-2xl' href='/profile'>@{name}</Link>
        <p className='text-gray-500 dark:text-gray-400'>sahil bishnoi</p>
        </span>
      </div> : <Skeleton type={"userId"}/>}
      <div className='flex flex-col gap-4'>
      <div className='text-xl'>People You May Know</div>
      {dataLoading ? <Skeleton type="sideProfile"/>:<>
        {allUsers.map((user)=>{
            return <UserIds heading="People You May Know" key={user._id} name={user.username} image={user.image} userId={user._id}/>
        })}</>}
      </div>
    </div>
  )
}
