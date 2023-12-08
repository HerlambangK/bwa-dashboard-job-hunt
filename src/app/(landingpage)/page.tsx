"use client";
import { Button } from "@/components/ui/button";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import SectionHeader from "./home/SectionHeader";
import SectionFeature from "./home/SectionFeature";
import SectionPricing from "./home/SectionPricing";
import SectionContact from "./home/SectionContact";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div className="container">
        <SectionHeader />
        {/* <SectionVideo /> */}
        <SectionFeature />
        {/* <SectionPricing /> */}
        <SectionPricing />
        <SectionContact />
      </div>
    </>
  );
}
