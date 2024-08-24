"use server";

import { auth } from "@/auth";
import { EditAccountSchema } from "@/schemas";

import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export const editAccountInfo = async (
  values: z.infer<typeof EditAccountSchema>,
) => {
  const parseValues = EditAccountSchema.safeParse(values);

  const session = await auth();

  if (!parseValues.success) {
    return { error: "Câmpuri invalide!" };
  }

  if (!session) {
    return { error: "Sessiune expirată!" };
  }
  const {
    name,
    email,
    oldPassword,
    newPassword,
    phoneNumber,
    gitHubUrl,
    facebookUrl,
    linkedlnUrl,
  } = parseValues.data;

  try {
    const currentUser = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (oldPassword || newPassword !== "") {
      const oldPasswordMatches = await bcrypt.compare(
        oldPassword as string,
        currentUser?.password as string,
      );

      if (!oldPasswordMatches) {
        return {
          error: `Parola veche nu corespunde cu emailul: ${currentUser?.email}!`,
        };
      }

      const hashedNewPassword = await bcrypt.hash(newPassword as string, 12);

      await db.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          name,
          email,
          password: hashedNewPassword,
        },
      });
    }
    if (
      phoneNumber === currentUser?.phoneNumber &&
      gitHubUrl === currentUser?.gitHubUrl &&
      facebookUrl === currentUser?.facebookUrl &&
      linkedlnUrl === currentUser?.linkedlnUrl &&
      name === currentUser?.name &&
      email === currentUser?.email &&
      oldPassword === "" &&
      newPassword === ""
    ) {
      return { error: "Nu există modificări!!" };
    }
    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name,
        email,
        phoneNumber,
        gitHubUrl,
        facebookUrl,
        linkedlnUrl,
      },
    });

    return { success: "Datele au fost actualizate!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
