import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { token: string };
  }
) {
  const { token } = params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        VerifyToken: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                },
              },
              {
                token,
              },
            ],
          },
        },
      },
    });

    if (!user) {
      console.error("Token is invalid or expired");
      throw new Error("Token is invalid or expired");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    const updatedToken = await prisma.verifyToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    if (updatedUser && updatedToken) {
      console.log("User successfully verified:", updatedUser);
      console.log("Token successfully updated:", updatedToken);
      // Redirect after successful verification
      return redirect("/auth/signin");
    } else {
      console.error("Failed to update user or token");
      throw new Error("Failed to update user or token");
    }
  } catch (error) {
    if (
      (error as Error).message &&
      (error as Error).message.includes("NEXT_REDIRECT")
    ) {
      // Handle the redirection
      console.log("Redirecting to /signin");
      return redirect("/auth/signin");
    } else {
      // Handle other errors or redirect to a generic error page
      console.error("Error during email verification:", error);
      return redirect("/error");
    }
  }
}
