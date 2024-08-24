import * as z from "zod";

export const UserTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  image: z.string(),
});

export type UserTableType = z.infer<typeof UserTableSchema>;
