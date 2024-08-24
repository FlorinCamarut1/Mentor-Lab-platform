"use client";
import Loading from "@/app/loading";
import useAllUsers from "@/hooks/users/useAllUsers";

import { DataTable } from "@/components/dashboard/data-table";
import { columns } from "@/components/dashboard/columns";

const DashboardPage = () => {
  const { data } = useAllUsers();

  if (!data) return <Loading />;

  return <DataTable columns={columns} data={data} />;
};

export default DashboardPage;
