"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center h-screen w-full justify-center">
      <h1 className="text-3xl font-semibold">
        {" "}
        Welcome {session?.user?.name}{" "}
      </h1>
    </div>
  );
}
