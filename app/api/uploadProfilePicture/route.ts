import { getUserById } from "@/lib/dbUtils";
import { deleteFileFromS3, uploadFileToS3 } from "@/lib/aws";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

import db from "@/lib/db";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Nu sunteți autentificat!" },
      { status: 401 },
    );
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Fisierul este lipsa!" },
        { status: 400 },
      );
    }

    const existingUser = await getUserById(currentUser?.id as string);

    if (existingUser?.image !== null) {
      const existingImage = existingUser?.image.split(".com/").pop();

      await deleteFileFromS3(existingImage as string);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadFileToS3(buffer, file.name);
    if (fileUrl) {
      await db.user.update({
        where: {
          id: currentUser?.id,
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
