"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { signUpFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sign } from "crypto";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Router from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignUpPageProps {
  // Props dinamis Anda
}

export const metadata: Metadata = {
  title: "Sign In App",
  description: "Please sign in",
};

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSumbit = async (val: z.infer<typeof signUpFormSchema>) => {
    // console.log(val);
    try {
      await fetch("/api/company/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      });
      toast({
        title: "success",
        description: `Your account has been created, welcome ${val.name}`,
      });

      await router.push("/auth/signin");
    } catch (error) {
      toast({
        title: "error",
        description: "Something went wrong when Sign Up",
      });
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border border-border p-5">
          <div className="font-semibold text-center text-2xl mb-2">
            Sign Up your account
          </div>
          <div className="text-sm text-gray-500">
            Enter your data to access dashboard
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSumbit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Sign Up</Button>
              <div className="text-sm">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
