import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import InviteCodeBar from "@/components/admin/Invitations/InviteCodeBar";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return <NotFound />;

  return (
    <div className="flex max-h-screen">
      <>{children}</>
      <InviteCodeBar />
    </div>
  );
};

export default AdminLayout;
