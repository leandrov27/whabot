// next
import { NextResponse } from "next/server";

// lib
import { db } from "@/lib/prisma";

// core
import { CreateUpdateCategorySchema } from "@/core/schemas";

// ----------------------------------------------------------------------

type Params = Promise<{ id: string }>;

// ----------------------------------------------------------------------

//* PUT /api/categories/[id]
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const body = await request.json();

    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { message: `El ID proporcionado: "${id}" es inválido.` },
        { status: 400 }
      );
    }

    const validationResult = CreateUpdateCategorySchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const selectedCategory = await db.category.findFirst({ where: { id: parsedId } });

    if(!selectedCategory) {
      return NextResponse.json(
        { message: `La categoría con ID #${parsedId} no se ha encontrado.` },
        { status: 404 }
      );
    }

    const { name } = validationResult.data;

    await db.category.update({
      where: { id: parsedId },
      data: { name: name },
    });

    return NextResponse.json(
      { message: `La categoría ${name} se ha modificado correctamente.` },
      { status: 201 }
    );
  } catch (error) {
    let errorMessage = "Error interno del servidor.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

//* DELETE /api/categories/[id]
export async function DELETE(_: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { message: `El ID proporcionado: "${id}" es inválido.` },
        { status: 400 }
      );
    }

    const selectedCategory = await db.category.findFirst({ where: { id: parsedId } });

    if(!selectedCategory) {
      return NextResponse.json(
        { message: `La categoría con ID #${parsedId} no se ha encontrado.` },
        { status: 404 }
      );
    }

    await db.category.delete({ where: { id: parsedId } });

    return NextResponse.json(
      { message: `La categoría ${selectedCategory.name} se ha eliminado correctamente.` },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Error interno del servidor.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
