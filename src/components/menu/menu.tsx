import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface MenuProps {}

const MenuGroup: FC<MenuProps> = ({}) => {
  const pathName = usePathname();

  return (
    <>
      <Link
        href="/about"
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-semibold hover:bg-zinc-100",
          pathName === "/generate" && "bg-zinc-100"
        )}
      >
        About
      </Link>
      <Link
        href="/portofolio"
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-semibold hover:bg-zinc-100",
          pathName === "/banksoal" && "bg-zinc-100"
        )}
      >
        Portofolio
      </Link>
      <Link
        href="/myaccount"
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-semibold hover:bg-zinc-100",
          pathName === "/myaccount" && "bg-zinc-100"
        )}
      >
        Akun Saya
      </Link>
    </>
  );
};

export default MenuGroup;
