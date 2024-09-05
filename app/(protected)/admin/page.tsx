"use client";
import { Suspense } from "react";
import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";

import Loading from "@/app/loading";
import InviteCodeBar from "@/components/admin/Invitations/InviteCodeBar";
import Header from "@/components/common/Header";
import SmallSkeleton from "@/components/common/skeletons/SmallSkeleton";
import useAllUsers from "@/hooks/users/useAllUsers";

const AdminDashboard = () => {
  const { data } = useAllUsers();

  if (!data) return <Loading />;
  return (
    <>
      <Header title="Bun venit la pagina Admin Dashboard" />
      <div className="flex gap-4">
        <div className="flex-1">
          <Suspense fallback={<Loading />}>
            {" "}
            <DataTable columns={columns} data={data} />;
          </Suspense>
        </div>
        <div className="grow-0">
          <Suspense fallback={<SmallSkeleton />}>
            <InviteCodeBar />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
