// next
import { NextResponse } from "next/server";

// lib
import { prisma } from "@/lib/prisma";

// core
import { CreateUpdateCategorySchema } from "@/core/schemas";

// ----------------------------------------------------------------------

//* GET /api/categories
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "3", 10);
  const skip = (page - 1) * limit;

  const categories = await prisma.category.findMany({
    skip,
    take: limit,
  });

  const total = await prisma.category.count();
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json(
    {
      categories,
      total,
      totalPages,
      currentPage: page,
    },
    { status: 200 }
  );
}

//* POST /api/categories
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = CreateUpdateCategorySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name } = validationResult.data;

    await prisma.category.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(
      { message: `La categoría ${name} se ha registrado correctamente.` },
      { status: 201 }
    );
  } catch (error) {
    let errorMessage = "Error interno del servidor";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
