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
// import * as Icons from "react-icons/all";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { MENU_DASHBOARD } from "@/constants";
import { Toast } from "@/components/ui/toast";
import { toast } from "react-hot-toast";
import MenuSideBar from "@/components/menu/menuSideBar";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();
  // const IconComponent = Icons[icons];
  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <MenuSideBar />
          </div>
        </div>
        <div className="space-y-4 py-2">
          <div className="px-3 py-3">
            <h2 className="mb-2 px-4 text-lg font-semibold">Setting</h2>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-sm hover:text-primary"
              onClick={() => router.push("/dashboard/settings")}
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
