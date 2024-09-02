import { auth } from "@/auth";
import { Suspense } from "react";

import Loading from "@/app/loading";
import InviteCodeBar from "@/components/admin/Invitations/InviteCodeBar";
import Header from "@/components/common/Header";
import SmallSkeleton from "@/components/common/skeletons/SmallSkeleton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  if (session?.user?.role === "ADMIN")
    return (
      <>
        <Header title="Bun venit la pagina Admin Dashboard" />
        <div className="flex gap-4">
          <div className="flex-1">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
          <div className="grow-0">
            <Suspense fallback={<SmallSkeleton />}>
              <InviteCodeBar />
            </Suspense>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Header title="Bun venit la pagina Dashboard" />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default DashboardLayout;
