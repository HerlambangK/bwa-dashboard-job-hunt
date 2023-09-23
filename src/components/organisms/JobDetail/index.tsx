import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PartyPopperIcon } from "lucide-react";
import React, { FC } from "react";

interface JobDetailProps {
  // Props dinamis Anda
}

const JobDetail: FC<JobDetailProps> = ({}) => {
  return (
    <div>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className="col-span-2 space-y-10">
          <div>
            <div className="text-3xl">Description</div>
            <div className="text-gray-500 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et,
              dignissimos suscipit alias similique nulla doloremque.
              Consequuntur neque, rerum necessitatibus totam inventore suscipit
              sequi omnis tempore optio provident quam delectus!
            </div>
          </div>
          <div>
            <div className="text-3xl">Responsibilities</div>
            <div className="text-gray-500 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et,
              dignissimos suscipit alias similique nulla doloremque.
              Consequuntur neque, rerum necessitatibus totam inventore suscipit
              sequi omnis tempore optio provident quam delectus!
            </div>
          </div>

          <div>
            <div className="text-3xl">Who You Are</div>
            <div className="text-gray-500 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et,
              dignissimos suscipit alias similique nulla doloremque.
              Consequuntur neque, rerum necessitatibus totam inventore suscipit
              sequi omnis tempore optio provident quam delectus!
            </div>
          </div>

          <div>
            <div className="text-3xl">Nice to Have</div>
            <div className="text-gray-500 mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde et,
              dignissimos suscipit alias similique nulla doloremque.
              Consequuntur neque, rerum necessitatibus totam inventore suscipit
              sequi omnis tempore optio provident quam delectus!
            </div>
          </div>
        </div>

        <div>
          <div className="text-3xl font-semibold">About this role</div>

          <div className="Shadow p-3 text-center my-6 ">
            1 <span className="text-gray-500">of 10 capacity</span>
            <Progress className="mt-2" value={10} />
          </div>

          <div className="mb-10 space-y-5 ">
            <div className="flex justify-between">
              <div className="text-gray-500">Apply Before</div>
              <div className="font-semibold">12 Agust 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Job Posted On</div>
              <div className="font-semibold">12 Agust 2023</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Job Type</div>
              <div className="font-semibold">Full Time</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Salary</div>
              <div className="font-semibold">Rp1000.000 /yr</div>
            </div>
          </div>
          <Separator />
          <div className="my-10">
            <div className="text-3xl font-semibold mb-4">Category</div>
            <div className="space-x-5">
              <Badge>Design</Badge>
            </div>
          </div>

          <Separator />
          <div className="my-10">
            <div className="text-3xl font-semibold mb-4">Required Skills</div>
            <div className="space-x-5">
              {["HTML", "CSS", "Javascript"].map((skill: string, i: number) => (
                <Badge variant={"outline"} key={skill + i}>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-10" />
      <div>
        <div className="text-3xl font-semibold">Perks & Benefits</div>
        <div className="text-gray-500">
          This Job comes with several perks and benefits
        </div>
        <div className="grid grid-cols-4 gap-5 mt-9 ">
          {[1, 2, 3].map((item: number, i: number) => (
            <div key={item} className="p-3 hover:shadow-lg shadow rounded-md">
              <PartyPopperIcon className="w-7 h-7 text-primary mb-6" />
              <div className="text-lg font-semibold mb-3">Full Healthcare</div>
              <div className="text-gray-500">Lorem ipsum dolor sit amet.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
