import prisma from "@/lib/prisma";
import { hashpassword } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  const hashPassword = await hashpassword(data.password);

  const result = await prisma.company.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashPassword,
    },
  });
  return NextResponse.json(result);
}
