"use client";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import Loading from "../Components/Loading";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function Login() {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data:session, status } = useSession();
  
  useEffect(() => {
    const checkUserName = async () =>{
      setLoading(true)
      const response = await fetch(`/api/users/checkusername/${session?.user.email}`)
      const data = await response.json()
      if (data.foundUsername) {
        router.push('/')
        setLoading(false)
      }
      else{
        router.push(`/login/getusername/${session?.user.id}`)
        setLoading(false)
      }
      return data;
    }
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    if (status === "authenticated"){
        setLoading(true);
        checkUserName();
    }
    setUpProviders();
  }, [status]);


  const continueWithGoogle = async (id) => {
    setLoading(true);
    try {
      await signIn(id);
      toast.success(`Please wait we are redirecting you`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error(`Something went wrong`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="flex w-full h-full  text-white items-center justify-start p-16">
      <div className="w-1/2 flex flex-col items-center justify-start gap-16 h-full mr-24">
        <div className="flex flex-col items-center justify-start h-1/4 mt-16">
          <span className="text-6xl" id="site-heading">
            Welcome Back!
          </span>
          <p className="text-gray-400 text-center">
            At Quotely, we believe in the extraordinary power of quotes to
            inspire, motivate, and uplift.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  continueWithGoogle(provider.id);
                }}
                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>

                {!loading || status==="loading" ? `Sign in with ${provider.name}` : "Redirecting..."}
              </button>
            ))}
          <button
            type="button"
            className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Twitter
          </button>
          <button
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 w-48"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Facebook
          </button>
        </div>
        <Link className="text-blue-400" href="/register">
          Don't have an account ?
        </Link>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center border-l-2 border-gray-600 gap-16">
        <div>
          <span className="text-6xl" id="site-heading">
            LOGIN
          </span>{" "}
            <i className="fa-solid fa-hippo ml-4 text-white text-6xl"></i>
        </div>
        <form className="w-2/3 ">
          <div className="mb-6">
            <label
              htmlFor="user-email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address or username
            </label>
            <input
              type="text"
              id="user-email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email or username"
              required=""
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required=""
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                defaultValue=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Show password
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
