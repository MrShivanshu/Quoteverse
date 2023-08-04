"use client";
import MainProfile from "../../Components/MainProfile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../../Components/Loading";

export default function page() {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/quotes`);
      const data = await response.json();
      setQuotes(data);
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/getUser/${session?.user.id}`);
      const data = await response.json();
      setUser(data);
    };
    if (status === "authenticated" && session?.user.id) {
      fetchPosts();
      fetchUser();
    } else if (status === "unauthenticated" || status === "") {
      router.push("/");
    }
  }, [session?.user.id, status]);
  if (status === "loading" || !user) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center">
      <MainProfile
        user={user}
        section={"My"}
        data={quotes}
        setData={setQuotes}
      />
    </div>
  );
}
