"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from '../../../../Components/Loading'
import { toast } from 'react-toastify';

export default function page({params}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(
        `/api/users/setUsername/${session?.user.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Welcome ${username}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/");
        setLoading(false)
      }
      else{
        toast.warn(`Something went wrong please try again`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if((status === "unauthenticated" ) || (session?.user.id !== params.id)){
      setLoading(true)
      toast.warn(`Permission denied`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push('/login')
    }
  }, [status]);
  if (status === "loading" || loading) {
    return <Loading/>;
  }
  return (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black z-10">
      <form
        className="w-1/2 h-full flex items-center justify-center flex-col gap-16"
        onSubmit={handleLoginSubmit}
      >
        <h1 className="w-full text-start text-white">
          Enter Password To Continue
        </h1>
        <div className="mb-6 w-full">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            min={5}
            max={20}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Choose a username"
            required
          />
          
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            max={8}
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Choose a password"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
