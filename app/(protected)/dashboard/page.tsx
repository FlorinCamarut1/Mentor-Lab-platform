"use client";
import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";

import useAllUsers from "@/hooks/users/useAllUsers";

const DashboardPage = () => {
  const { data: allUsersData } = useAllUsers();

  return (
    <div className="m-auto min-h-screen max-w-[1200px] p-2">
      <DataTable columns={columns} data={allUsersData} />
    </div>
  );
};

export default DashboardPage;
