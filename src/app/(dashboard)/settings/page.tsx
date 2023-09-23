import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewForm from "@/components/forms/OverviewForm";
import SosialMediaForm from "@/components/forms/SosialMediaForm";
import TeamForm from "@/components/forms/TeamForm";

interface SettingPageProps {
  // Props dinamis Anda
}

const SettingPage: FC<SettingPageProps> = ({}) => {
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
          <OverviewForm />
        </TabsContent>
        <TabsContent value="sosialLinks">
          <SosialMediaForm />
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
