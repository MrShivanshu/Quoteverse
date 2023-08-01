"use client";
import MainProfile from "../../Components/MainProfile";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../../Components/Loading";

export default function page() {
  const [quotes, setQuotes] = useState([]);
  const { data: session, status } = useSession();
    const router = useRouter();
  const handleLogOut = async () => {
    await signOut()
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/quotes`);
      const data = await response.json();

      setQuotes(data);
    };
    if (status === "authenticated" && session?.user.id){
        fetchPosts()
    }
    else if (status === "unauthenticated" || status === ""){
        router.push("/")
    }
  }, [session?.user.id]);
  if (status === "loading") {
    return <div><Loading/></div>;
  }
  return (
    <div className="w-full flex justify-center items-center">
      <MainProfile
        name={session?.user.name}
        image={session?.user.image}
        section={"My"}
        data={quotes}
        handleLogOut={handleLogOut}
      />
    </div>
  );
}
