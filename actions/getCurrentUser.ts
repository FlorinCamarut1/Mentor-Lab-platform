import { auth } from "@/auth";
import db from "@/lib/db";

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const currentUser = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      CV: true,
    },
  });

  if (!currentUser) {
    return null;
  }
  return currentUser;
};
