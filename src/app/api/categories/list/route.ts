import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json({categories}, { status: 200 });
}
