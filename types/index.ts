import { UserRole } from "@prisma/client";

export type SessionType = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: UserRole;
  };
  expires: string;
};
