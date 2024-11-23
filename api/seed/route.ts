import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 직접 Prisma 호출
    const team = await prisma.team.create({
      data: {
        name: "Team Alpha",
        product: {
          create: {
            name: "Product A",
            picture: "https://example.com/image.png",
            status: "available",
            description: "This is a sample product.",
          },
        },
        settings: {
          create: {
            blurred: false,
          },
        },
      },
    });

    return NextResponse.json({ success: true, team });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
