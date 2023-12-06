import prisma from "@/lib/prisma";
import { hashpassword } from "@/lib/utils";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import transporter from "@/lib/nodemailer";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { EmailTemplate } from "@/components/emails/PrimaryActionEmail";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      console.error(
        "Error creating user or token email sudah ada:",
        existingUser
      );
      return NextResponse.json(
        {
          error: true,
          message: "Email is already registered",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }

  const hashPassword = await hashpassword(data.password);

  try {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
      },
    });

    const token = await prisma.verifyToken.create({
      data: {
        userId: result.id,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });

    const info = await transporter.sendMail({
      from: `"EmailVerifier"<${process.env.BESTMAIL_ADDRESS}>`, // sender address
      to: result.email, // list of receivers
      subject: "Verify your email address", // Subject line
      html: `
          <p>Hello ${capitalizeFirstLetter(result.name)}, </p>
           <p>Please click on the link below to verify your email address: <a href="${
             process.env.NEXTAUTH_URL
           }api/verification/${token.token}">
          ${process.env.NEXTAUTH_URL}api/verification/${token.token}</a></p> `, // html body
      // EmailTemplate({
      //   actionLabel: "Verify Email",
      //   buttonText: "Verify Email",
      //   href: `${process.env.NEXTAUTH_URL}/api/verification/${token.token}`,
      // }),
    });

    console.log(`Verification email sent to: ${result.name}`, info.messageId);

    console.log("Verification email sent to: " + result.name, info.messageId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating user or token:", error);
    return NextResponse.error();
  }
}
