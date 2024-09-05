"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/dbUtils";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Câmpuri invalide!" };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: "Email inexistent!" };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo:
        user?.role === "ADMIN"
          ? "/admin"
          : callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credentiale invalide!" };
        default:
          return { error: "Ceva nu a mers bine!" };
      }
    }
    throw error;
  }
};
