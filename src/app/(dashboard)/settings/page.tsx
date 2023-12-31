import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewForm from "@/components/forms/OverviewForm";
import SosialMediaForm from "@/components/forms/SosialMediaForm";
import TeamForm from "@/components/forms/TeamForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

interface SettingPageProps {
  // Props dinamis Anda
}
export const revalidate = 0;

async function getDetailCompany() {
  const session = await getServerSession(authOptions);

  const company = await prisma.company.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      CompanyOverview: true,
      CompanySosialMedia: true,
      CompanyTeam: true,
    },
  });
  return company;
}

const SettingPage: FC<SettingPageProps> = async ({}) => {
  const company = await getDetailCompany();
  // console.log(company);
  return (
    <div>
      <div className="font-semibold text-3xl mb-5">SettingPage</div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sosialLinks">Sosial Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewForm detail={company?.CompanyOverview[0]} />
        </TabsContent>
        <TabsContent value="sosialLinks">
          <SosialMediaForm detail={company?.CompanySosialMedia[0]} />
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm teams={company?.CompanyTeam} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
