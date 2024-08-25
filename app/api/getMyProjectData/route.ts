import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Trebuie să fiți autentificat!" },
      { status: 401 },
    );
  }
  try {
    const myProjectData = await db.user.findUnique({
      where: {
        id: currentUser?.id,
      },
      select: {
        AcceptedStudent: {
          select: {
            id: true,
            createdAt: true,
            projectDescription: true,
            projectName: true,
          },
        },
      },
    });
    if (!myProjectData) {
      return NextResponse.json(
        { error: "Nu am gasit nici un proiect asociat acestui cont!" },
        { status: 401 },
      );
    }
    return NextResponse.json(myProjectData.AcceptedStudent);
  } catch (error) {
    return NextResponse.json({ error: "Ceva nu a mers bine" }, { status: 400 });
  }
};
