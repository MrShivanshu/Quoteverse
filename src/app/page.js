"use client";
import Jumbotron from "@/Components/Jumobotron";
import { useSession } from "next-auth/react";
import Home from "@/Components/Home";

export default function page() {
  const { status } = useSession();
  return (
    <div id="quote-area" className="w-full">
      {status === "authenticated" ? <Home /> : <Jumbotron />}
    </div>
  );
}
