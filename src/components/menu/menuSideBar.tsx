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
import { Toast, ToastAction } from "@/components/ui/toast";
import { Toaster, toast } from "react-hot-toast";
import { useToast } from "../ui/use-toast";

interface MenuSideBarProps {}

const MenuSideBar: FC<MenuSideBarProps> = ({}) => {
  const router = useRouter();
  // const toast = useToast();\

  const notify = () => toast.error("Fitur ini masih dalam pengembangan");

  return (
    <>
      <Button
        variant={"ghost"}
        className="w-full justify-start rounded-sm hover:text-primary"
        onClick={() => router.push("/")}
      >
        <AiOutlineHome className="mr-2 text-lg" /> Home
      </Button>

      <Button
        variant={"ghost"}
        className="w-full justify-start rounded-sm hover:text-primary bg-blend-color-burn"
        onClick={notify}
        disabled
      >
        <BsEnvelope className="mr-2 text-lg" /> Messages
      </Button>

      <Button
        variant={"ghost"}
        className="w-full justify-start rounded-sm hover:text-primary"
        onClick={notify}
      >
        <HiOutlineBuildingOffice2 className="mr-2 text-lg" /> Company Profile
      </Button>

      <Button
        variant={"ghost"}
        className="w-full justify-start rounded-sm hover:text-primary"
        disabled
        onClick={() => toast("Fitur ini masih dalam pengembangan")}
      >
        <PiUsersThreeBold className="mr-2 text-lg" /> All Applicants
      </Button>

      <Button
        variant={"ghost"}
        className="w-full justify-start rounded-sm hover:text-primary"
        onClick={() => router.push("/dashboard/job-listings")}
      >
        <HiOutlineDocumentText className="mr-2 text-lg" /> Job Listings
      </Button>

      <Button
        variant={"ghost"}
        className="w-full justify-start rounded-sm hover:text-primary"
        disabled
        onClick={notify}
      >
        <BsCalendar2Date className="mr-2 text-lg" /> My Schadule
      </Button>
      <Toaster />
    </>
  );
};

export default MenuSideBar;
