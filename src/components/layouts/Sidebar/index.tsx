"use client";

import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import {
  HiOutlineBuildingOffice2,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { BsEnvelope, BsCalendar2Date, BsGear } from "react-icons/bs";
import { PiUsersThreeBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              onClick={() => router.push("/")}
            >
              <AiOutlineHome className="mr-2 text-lg" /> Home
            </Button>

            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              disabled
            >
              <BsEnvelope className="mr-2 text-lg" /> Messages
            </Button>

            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              disabled
            >
              <HiOutlineBuildingOffice2 className="mr-2 text-lg" /> Company
              Profile
            </Button>

            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              disabled
            >
              <PiUsersThreeBold className="mr-2 text-lg" /> All Applicants
            </Button>

            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              onClick={() => router.push("/job-listings")}
            >
              <HiOutlineDocumentText className="mr-2 text-lg" /> Job Listings
            </Button>

            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              disabled
            >
              <BsCalendar2Date className="mr-2 text-lg" /> My Schadule
            </Button>
          </div>
        </div>
        <div className="space-y-4 py-2">
          <div className="px-3 py-3">
            <h2 className="mb-2 px-4 text-lg font-semibold">Setting</h2>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              onClick={() => router.push("/settings")}
            >
              <BsGear className="mr-2 text-lg" /> Setting
            </Button>

            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm text-red-500 hover:bg-red-200 hover:text-red-500 "
              onClick={() => signOut()}
            >
              <AiOutlineLogout className="mr-2 text-lg" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
