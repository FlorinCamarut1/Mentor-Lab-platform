import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

import db from "@/lib/db";

export const GET = async (req: NextRequest, context: Context) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  try {
    const { params } = context;
    const teacherId = params?.teacherId;

    console.log(teacherId);
    const session = await auth();

    if (session?.user?.role !== "TEACHER") {
      return NextResponse.json(
        {
          error: "Trebuie să fiți profesor pentru a accesa această informație!",
        },
        { status: 401 },
      );
    } else if (!session.user.pdfHostedUrl) {
      return NextResponse.json({ error: "Nu aveti CV!" });
    } else if (session.user.pdfHostedUrl) {
      const cvInfo = await db.cV.findMany({
        where: {
          userId: teacherId as string,
        },
        select: {
          createdAt: true,
          pdfHostedUrl: true,
          updatedAt: true,
        },
      });

      return NextResponse.json(cvInfo[0]);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
