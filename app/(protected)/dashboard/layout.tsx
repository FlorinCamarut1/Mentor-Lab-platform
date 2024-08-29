import { auth } from "@/auth";
import { Suspense } from "react";

import Loading from "@/app/loading";
import InviteCodeBar from "@/components/admin/Invitations/InviteCodeBar";
import Header from "@/components/common/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  if (session?.user?.role === "ADMIN")
    return (
      <Suspense fallback={<Loading />}>
        <Header title="Bun venit la pagina Admin Dashboard" />
        <div className="flex gap-4">
          <div className="flex-1">{children}</div>
          <div className="grow-0">
            <InviteCodeBar />
          </div>
        </div>
      </Suspense>
    );

  return (
    <Suspense fallback={<Loading />}>
      <Header title="Bun venit la pagina Dashboard" />
      {children}
    </Suspense>
  );
};

export default DashboardLayout;
