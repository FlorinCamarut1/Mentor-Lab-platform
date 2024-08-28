import { auth } from "@/auth";
import { deleteFileFromS3 } from "@/lib/aws";
import { getUserById } from "@/lib/dbUtils";
import { cvIndex } from "@/lib/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

import db from "@/lib/db";

export const DELETE = async (req: NextRequest, context: Context) => {
  if (req.method !== "DELETE") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Trebuie să fiți autentificat!" },
      { status: 401 },
    );
  }
  const existingUser = await getUserById(session?.user?.id as string);
  const { params } = context;
  const cvId = params?.cvId;

  console.log(cvId);
  const isTeacher = existingUser?.role === "TEACHER";
  const existingPDF = existingUser?.CV[0].pdfHostedUrl.split(".com/").pop();

  if (!isTeacher) {
    return NextResponse.json(
      { error: "Trebuie să fiți profesor pentru a încărca un CV!" },
      { status: 401 },
    );
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.cV.deleteMany({
        where: {
          id: cvId,
        },
      });
      await deleteFileFromS3(existingPDF as string);
      await cvIndex.deleteOne(cvId);
    });

    return NextResponse.json(
      { success: "CV-ul a fost șters!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
