import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Periksa apakah ada entitas dengan nama yang sama
  const dataAlreadyExists = await prisma.companyTeam.findFirst({
    where: {
      name: data.name,
    },
  });

  if (dataAlreadyExists) {
    return NextResponse.json(
      {
        error: "Team with the same name already exists",
      },
      { status: 400 }
    ); // Bad Request
  }

  // Jika data belum ada dalam database, simpan data dan kirim respons sukses.
  const result = await prisma.companyTeam.create({
    data,
  });

  return NextResponse.json(result);
}
