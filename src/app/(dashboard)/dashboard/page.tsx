"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
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
