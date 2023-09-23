import { Metadata } from "next";
import React, { FC } from "react";

interface SignInPageProps {
  // Props dinamis Anda
}

export const metadata: Metadata = {
  title: "Sign In App",
  description: "Please sign in",
};

const SignInPage: FC<SignInPageProps> = ({}) => {
  return <div>SignInPage</div>;
};

export default SignInPage;
