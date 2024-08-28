import { auth } from "@/auth";
import InviteCodeBar from "@/components/admin/Invitations/InviteCodeBar";
import Header from "@/components/common/Header";
import RequestsContainer from "@/components/joinTeacherRequests/RequestsContainer";

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
          <div className="flex-1">{children}</div>
          <div className="grow-0">
            <InviteCodeBar />
          </div>
        </div>
      </>
    );

  return (
    <>
      <Header title="Bun venit la pagina Dashboard" />
      {children}
    </>
  );
};

export default DashboardLayout;
