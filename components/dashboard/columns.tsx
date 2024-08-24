"use client";

import { ColumnDef } from "@tanstack/react-table";
import { roles } from "./data/data";
import { UserTableType } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import Image from "next/image";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    headerText?: string;
  }
}

export const columns: ColumnDef<UserTableType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nume" />
    ),
    meta: {
      headerText: "Nume",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: {
      headerText: "Email",
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Imagine profil" />
    ),
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue<string>("image") || "/images/placeholder.png"}
          alt="User image"
          width={100}
          height={100}
          priority
          className="h-10 w-10 rounded-full"
        />
      );
    },
    meta: {
      headerText: "Imagine profil",
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role"));

      if (!role) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {role.icon && (
            <role.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      headerText: "Rol",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    meta: {
      headerText: "Acțiuni",
    },
  },
];
