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

export type NavLinksTypes = {
  id: number;
  title: string;
  href: string;
  protected: boolean;
};
