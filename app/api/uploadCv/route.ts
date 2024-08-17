import { create } from "zustand";
import { CV } from "@prisma/client";
import { auth } from "@/auth";
import { deleteFileFromS3, uploadFileToS3 } from "@/lib/aws";
import { NextResponse } from "next/server";
import { getEmbedding } from "@/lib/openai";
import { cvIndex } from "@/lib/pinecone";

import db from "@/lib/db";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  const session = await auth();
  const existingUser = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      CV: true,
    },
  });

  const isTeacher = existingUser?.role === "TEACHER";
  if (!isTeacher) {
    return NextResponse.json(
      { error: "Trebuie să fiți profesor pentru a încărca un CV!" },
      { status: 401 },
    );
  }

  try {
    const formData = await req.formData();
    const pdf = formData.get("file") as File;
    const text = formData.get("text") as string;
    const title = `CV profesor ${existingUser?.name}`;

    const embedding =
      pdf && text !== "" ? await getEmbeddingForCV(title, text) : null;

    if (embedding === null) {
      return NextResponse.json({ error: "CV-ul este lipsa!" }, { status: 400 });
    }

    if (!pdf || !text) {
      return NextResponse.json({ error: "CV-ul este lipsa!" }, { status: 400 });
    }

    const buffer = Buffer.from(await pdf.arrayBuffer());
    const userId = existingUser.id;
    const fileUrl = await uploadFileToS3(buffer, pdf.name);

    if (existingUser?.CV.length > 0) {
      const existingPDF = existingUser?.CV[0].pdfHostedUrl.split(".com/").pop();

      const updateCv = await db.$transaction(async (tx) => {
        const updateCv = await tx.cV.update({
          where: {
            id: existingUser?.CV[0].id,
          },
          data: {
            title: title,
            pdfHostedUrl: fileUrl,
            updatedAt: new Date(),
            content: text,
          },
        });
        await deleteFileFromS3(existingPDF as string);
        await cvIndex.upsert([
          {
            id: existingUser?.CV[0].id,
            values: embedding,
            metadata: { userId },
          },
        ]);
        return updateCv;
      });
    } else {
      const newCv = await db.$transaction(async (tx) => {
        const newCv = await tx.cV.create({
          data: {
            title: title,
            content: text,
            userId: existingUser?.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            pdfHostedUrl: fileUrl,
          },
        });
        await cvIndex.upsert([
          {
            id: newCv.id,
            values: embedding,
            metadata: { userId },
          },
        ]);
        return newCv;
      });
    }

    return NextResponse.json({ success: "CV-ul a fost incărcat!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};

const getEmbeddingForCV = async (
  title: string,
  content: string | undefined,
) => {
  return getEmbedding(title + "\n\n" + content);
};
