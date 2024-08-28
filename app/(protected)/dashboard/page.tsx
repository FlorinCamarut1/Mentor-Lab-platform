"use client";
import Loading from "@/app/loading";
import useAllUsers from "@/hooks/users/useAllUsers";

import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/columns";
import { Suspense } from "react";

const DashboardPage = () => {
  const { data } = useAllUsers();

  if (!data) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <DataTable columns={columns} data={data} />
    </Suspense>
  );
};

export default DashboardPage;
