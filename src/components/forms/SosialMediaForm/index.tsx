"use client";
import FieldInput from "@/components/organisms/FieldInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { sosialMediaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySosialMedia } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SosialMediaFormProps {
  detail: CompanySosialMedia | undefined;
}

const SosialMediaForm: FC<SosialMediaFormProps> = ({ detail }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof sosialMediaFormSchema>>({
    resolver: zodResolver(sosialMediaFormSchema),
    defaultValues: {
      ...detail,
    },
  });

  const onSubmit = async (val: z.infer<typeof sosialMediaFormSchema>) => {
    try {
      setIsSubmitting(true);

      const body = {
        ...val,
        companyId: session?.user.id,
      };
      await fetch("/api/company/sosial-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await router.refresh();

      toast({
        title: "Success",
        description: "Add sosial media successfully",
        duration: 5000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add sosial media",
        duration: 3000,
      });
      console.log(error);
    }
    setIsSubmitting(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FieldInput
          title="Basic Information"
          subtitle="Add elsewhere links to your company profile. You can add only username without full https links."
        >
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.facebook.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.instagram.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.twitter.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>linkedin</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.linkedin.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.youtube.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FieldInput>
        <div className="flex justify-end items-center">
          <Button size={"lg"} type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin mr-2" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SosialMediaForm;
