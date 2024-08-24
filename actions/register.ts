"use server";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/dbUtils";

import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  inviteToken?: string,
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Câmpuri invalide!" };
  }

  const { email, password, name } = validatedFields.data;
  try {
    const emailExists = await getUserByEmail(email);

    if (emailExists) {
      return { error: "Email existent!", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    if (inviteToken) {
      const tokenIsValid = await db.inviteToken.findFirst({
        where: {
          token: inviteToken,
          expires: {
            gte: new Date(),
          },
        },
      });

      if (!tokenIsValid) {
        return { error: "Token invalid!" };
      } else if (tokenIsValid) {
        const teacher = await db.user.create({
          data: {
            email,
            name,
            password: hashedPassword,
            role: "TEACHER",
          },
        });

        await db.inviteToken.deleteMany({
          where: {
            token: inviteToken,
          },
        });

        return { success: "înregistrare profesor reușită!" };
      }
    } else if (!inviteToken) {
      await db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      return { success: "înregistrare student reușită!" };
    }
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
