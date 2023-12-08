import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_LISTING_COLUMS, JOB_LISTING_DATA } from "@/constants";
import { Badge } from "@/components/ui/badge";
import ButtonActionTable from "@/components/organisms/ButtonActionTable";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Job } from "@prisma/client";
import { dateFormat } from "@/lib/utils";
import moment from "moment";

interface JoblistingsPageProps {
  // Props dinamis Anda
}
export const revalidate = 0;

async function getDataJobs() {
  const session = await getServerSession(authOptions);
  const job = prisma.job.findMany({
    where: {
      companyId: session?.user?.id,
    },
  });
  return job;
}

const JoblistingsPage: FC<JoblistingsPageProps> = async ({}) => {
  const job = await getDataJobs();
  // console.log(job);

  return (
    <div>
      <div className="font-semibold text-md md:text-3xl">Job Listings</div>
      <div className="mt-10">
        <Table>
          <TableCaption>A list of your job listings.</TableCaption>
          <TableHeader>
            <TableRow>
              {JOB_LISTING_COLUMS.map((item: string, index: number) => (
                <TableHead
                  key={item + 1}
                  className="text-xs md:text-md font-semibold"
                >
                  {item}
                </TableHead>
              ))}
              <TableHead className="text-xs md:text-md font-semibold">
                <Badge variant={"outline"}>Action</Badge>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job.map((item: Job, i: number) => (
              <TableRow key={item.roles + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{dateFormat(item.datePosted)}</TableCell>
                <TableCell>{dateFormat(item.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant={"outline"}>{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants}/{item.needs}
                </TableCell>
                <TableCell>
                  <ButtonActionTable url={`/job-detail/${item.id}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ); // Render kode Anda
};

export default JoblistingsPage;
