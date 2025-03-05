// next
import { NextResponse } from "next/server";

// lib
import { db } from "@/lib/prisma";

// core
import { CreateUpdateServiceSchema } from "@/core/schemas";

// ----------------------------------------------------------------------

//* GET /api/services
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "3", 10);
  const skip = (page - 1) * limit;

  const services = await db.service.findMany({
    skip: skip,
    take: limit,
    include: {
      category: true
    }
  });

  const total = await db.service.count();
  const totalPages = Math.ceil(total / limit);

  return NextResponse.json(
    {
      services,
      total,
      totalPages,
      currentPage: page,
    },
    { status: 200 }
  );
}

//* POST /api/services
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validationResult = CreateUpdateServiceSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, price, category_id } = validationResult.data;

    const selectedCategory = await db.category.findFirst({ 
      where: { id: Number(category_id) },
      select: { id: true }
    });

    if(!selectedCategory) {
      return NextResponse.json(
        { message: `La categoría con ID #${category_id} no se ha encontrado.` },
        { status: 404 }
      );
    }

    await db.service.create({
      data: {
        name: name,
        price: price,
        idCategory: selectedCategory.id,
      },
    });

    return NextResponse.json(
      { message: `El servicio ${name} se ha registrado correctamente.` },
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
