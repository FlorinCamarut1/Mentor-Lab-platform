import { auth } from "@/auth";
import db from "./db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id?: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        CV: {
          select: {
            pdfHostedUrl: true,
          },
        },
      },
    });
    return user;
  } catch {
    return null;
  }
};
