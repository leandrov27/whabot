// next
import { NextResponse } from "next/server";

// lib
import { db } from "@/lib/prisma";

// core
import { CreateUpdateServiceSchema } from "@/core/schemas";

// ----------------------------------------------------------------------

type Params = Promise<{ id: string }>;

// ----------------------------------------------------------------------

//* GET /api/services/[id]
export async function GET(_: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { message: `El ID proporcionado: "${id}" es inválido.` },
        { status: 400 }
      );
    }

    const services = await db.service.findMany({
      where: { idCategory: parsedId },
      select: {
        name: true,
        price: true,
        category: true
      },
    });

    return NextResponse.json(
      { services },
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

//* PUT /api/services/[id]
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

    const validationResult = CreateUpdateServiceSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: validationResult.error.errors },
        { status: 400 }
      );
    }

    const selectedService = await db.service.findFirst({ where: { id: parsedId } });

    if(!selectedService) {
      return NextResponse.json(
        { message: `El servicio con ID #${parsedId} no se ha encontrado.` },
        { status: 404 }
      );
    }

    const { name, price, category_id } = validationResult.data;

    const selectedCategory = await db.category.findFirst({ 
      where: { id: category_id },
      select: { id: true }
    });

    if(!selectedCategory) {
      return NextResponse.json(
        { message: `La categoría con ID #${category_id} no se ha encontrado.` },
        { status: 404 }
      );
    }

    await db.service.update({
      where: { id: parsedId },
      data: { 
        name,
        price,
        idCategory: selectedCategory.id
      },
    });

    return NextResponse.json(
      { message: `El servicio ${name} se ha modificado correctamente.` },
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

//* DELETE /api/services/[id]
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

    const selectedService= await db.service.findFirst({ where: { id: parsedId } });

    if(!selectedService) {
      return NextResponse.json(
        { message: `El servicio con ID #${parsedId} no se ha encontrado.` },
        { status: 404 }
      );
    }

    await db.service.delete({ where: { id: parsedId } });

    return NextResponse.json(
      { message: `El servicio ${selectedService.name} se ha eliminado correctamente.` },
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
