import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Parola trebuie să aibă cel puțin 8 caractere" })
      .refine((password) => password.match(/\d/), {
        message: "Parola trebuie să conțină cel puțin o cifră",
      })
      .refine((password) => password.match(/[a-z]/), {
        message: "Parola trebuie să conțină cel puțin o literă mică",
      })
      .refine((password) => password.match(/[A-Z]/), {
        message: "Parola trebuie să conțină cel puțin o literă mare",
      })
      .refine((password) => password.match(/[^A-Za-z\d]/), {
        message: "Parola trebuie să conțină cel puțin un caracter special",
      }),
    name: z
      .string()
      .min(3, { message: "Numele trebuie să conțină cel puțin 3 caractere" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolele nu se potrivesc",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const EditAccountSchema = z
  .object({
    email: z.string().email().optional(),
    name: z
      .string()
      .min(3, { message: "Numele trebuie să conțină cel puțin 3 caractere" })
      .optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Ensure both oldPassword and newPassword are either both filled or both empty
      if (data.oldPassword || data.newPassword) {
        return data.oldPassword && data.newPassword;
      }
      return true;
    },
    {
      message: "Te rog să completezi ambele câmpuri, parola veche si cea nouă",
      path: ["oldPassword"], // Link the error message to oldPassword field
    },
  )
  .refine(
    (data) => {
      // Apply password strength checks only if newPassword is provided
      if (data.newPassword) {
        return (
          data.newPassword.length >= 8 &&
          /\d/.test(data.newPassword) && // at least one digit
          /[a-z]/.test(data.newPassword) && // at least one lowercase letter
          /[A-Z]/.test(data.newPassword) && // at least one uppercase letter
          /[^A-Za-z\d]/.test(data.newPassword)
        ); // at least one special character
      }
      return true;
    },
    {
      message:
        "Parola trebuie să aibă cel puțin 8 caractere, o cifră, o literă mică, o literă mare și un caracter special",
      path: ["newPassword"], // Apply the error to the newPassword field
    },
  )
  .refine(
    (data) => {
      // Ensure that if newPassword is filled, oldPassword must also be filled
      if (data.newPassword && !data.oldPassword) {
        return false;
      }
      return true;
    },
    {
      message:
        "Dacă introduci o nouă parolă, trebuie să introduci și parola veche",
      path: ["oldPassword"], // Apply the error to oldPassword field
    },
  );
