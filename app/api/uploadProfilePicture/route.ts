import { getUserById } from "@/lib/dbUtils";

import { auth } from "@/auth";
import { deleteFileFromS3, uploadFileToS3 } from "@/lib/aws";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  const session = await auth();
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Fisierul este lipsa!" },
        { status: 400 },
      );
    }

    const existingUser = await getUserById(session?.user?.id as string);

    if (existingUser?.image !== null) {
      const existingImage = existingUser?.image.split(".com/").pop();

      await deleteFileFromS3(existingImage as string);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadFileToS3(buffer, file.name);
    if (fileUrl) {
      await db.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          image: fileUrl,
        },
      });
    }

    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Eroare la server!" }, { status: 500 });
  }
};
