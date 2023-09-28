"use client";
import TitleForm from "@/components/atoms/TitleForm";
import CustomUpload from "@/components/organisms/CustomUpload";
import FieldInput from "@/components/organisms/FieldInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { overviewFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EMPLOYEE_OPTIONS, LOCATION_OPTIONS, optionType } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn, fetcher } from "@/lib/utils";
import InputSkills from "@/components/organisms/InputSkills";
import CKEditor from "@/components/organisms/CKEditor";
import useSWR from "swr";
import { CompanyOverview, Industry } from "@prisma/client";
import { supabaseUploadFile } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { IoIosRefresh } from "react-icons/io";

interface OverviewFormProps {
  detail: CompanyOverview | undefined;
}

const OverviewForm: FC<OverviewFormProps> = ({ detail }) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data } = useSWR<Industry>("/api/company/industry", fetcher);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof overviewFormSchema>>({
    resolver: zodResolver(overviewFormSchema),
    defaultValues: {
      dateFounded: detail?.dateFounded,
      description: detail?.description,
      employee: detail?.employee,
      image: detail?.image,
      industry: detail?.industry,
      location: detail?.location,
      name: detail?.name,
      techStack: detail?.techStack,
      website: detail?.website,
    },
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const onSubmit = async (val: z.infer<typeof overviewFormSchema>) => {
    try {
      setIsSubmitting(true);
      let filename = "";
      if (typeof val.image === "object") {
        const uploadImg = await supabaseUploadFile(val.image, "company");
        filename = uploadImg.filename;
      } else {
        filename = val.image;
      }

      const body = {
        ...val,
        image: filename,
        companyId: session?.user.id,
      };

      const response = await fetch("/api/company/overview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Edit company overview successfully",
          duration: 5000,
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to edit company overview",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      await toast({
        variant: "destructive",
        title: "Error",
        description: "Please try again",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <div>
        <TitleForm
          title="Basic Information"
          subtitle="This is basic information that you can update anytime."
        />
      </div>

      <Separator className="mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FieldInput
            title="Company Logo"
            subtitle="This  image will be shown publicly as company logo."
          >
            <CustomUpload form={form} name="image" />
          </FieldInput>

          <FieldInput
            title="Company Details"
            subtitle="Introduce your company core info quickly to users by fill up company details"
          >
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Twitter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://twitter.com/"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[450px]">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((item: optionType, i: number) => {
                          return (
                            <SelectItem key={item.id + i} value={item.id}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-[450px] grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYEE_OPTIONS.map(
                            (item: optionType, i: number) => {
                              return (
                                <SelectItem key={item.id + i} value={item.id}>
                                  {item.label}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(Array.isArray(data) ? data : []).map(
                            (item: Industry) => {
                              return (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dateFounded"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Founded</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[450px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Please pick a date.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputSkills
                form={form}
                name="techStack"
                label="Add Tech Stack"
              />
            </div>
          </FieldInput>
          <FieldInput
            title="About Company"
            subtitle="Brief description for your company. URLs are hyperlinked."
          >
            <CKEditor
              form={form}
              name="description"
              editorLoaded={editorLoaded}
            />
          </FieldInput>
          <div className="flex justify-end items-center">
            <Button size={"lg"} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center">
                  <IoIosRefresh className="animate-spin mr-2" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OverviewForm;
