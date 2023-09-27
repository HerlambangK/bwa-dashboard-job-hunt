import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/layouts/Applicants";
import JobDetail from "@/components/organisms/JobDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

type paramsType = {
  id: string;
};
interface JobDetailPageProps {
  params: paramsType;
}

async function getDatailJobs(id: string) {
  const job = await prisma.job.findFirst({
    where: {
      id: id,
    },
    include: {
      Applicants: {
        include: {
          user: true,
        },
      },
      CategoryJob: true,
    },
  });

  return job;
}

const JobDetailPage: FC<JobDetailPageProps> = async ({ params }) => {
  const job = await getDatailJobs(params.id);
  console.log("job :", job?.CategoryJob?.name);
  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href={"/job-listings"}>
            <ArrowLeftIcon className="w-9 h-9" />
          </Link>
        </div>
        <div>
          <div className="text-2xl font-semibold mb-1">{job?.roles}</div>
          <div>
            {job?.CategoryJob?.name}. {job?.jobType}.{" "}
            <span className="text-gray-500">
              {job?.applicants}/{job?.needs} Hired
            </span>
          </div>
        </div>
      </div>
      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants applicants={job?.Applicants} />
        </TabsContent>
        <TabsContent value="jobDetails">
          <JobDetail detail={job} />
        </TabsContent>
      </Tabs>
    </div>
  );
  // Render kode Anda
};

export default JobDetailPage;
