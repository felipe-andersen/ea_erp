import prisma from "@/lib/prisma/prisma-client";

import UserSchema from "@/shared/schemas/createUserSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    // validação
    const data = UserSchema.parse(json);

    // criação no prisma
    const user = await prisma.user.create({ data });

    return Response.json(user);

  } catch (error: any) {
    // erro do Zod
    if (error.name === "ZodError") {
      return new Response(JSON.stringify({
        error: "Validation error",
        details: error.errors
      }), { status: 400 });
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verifica se o user existe
    const exists = await prisma.user.findUnique({
      where: { id },
    });

    if (!exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Deleta
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const data = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}
