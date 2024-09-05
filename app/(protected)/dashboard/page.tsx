"use client";
import { Suspense } from "react";
import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/columns";

import Loading from "@/app/loading";
import useAllUsers from "@/hooks/users/useAllUsers";
import Header from "@/components/common/Header";

const DashboardPage = () => {
  const { data } = useAllUsers();

  if (!data) return <Loading />;

  return (
    <>
      <Header title="Bun venit la pagina Dashboard" />
      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </>
  );
};

export default DashboardPage;
