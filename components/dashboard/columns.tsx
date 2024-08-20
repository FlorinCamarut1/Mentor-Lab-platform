"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    headerText?: string;
  }
}

export type TableUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  image: string;
};
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TableUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nume
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: { headerText: "Nume" },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: { headerText: "Email" },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: { headerText: "Rol" },
  },
  {
    accessorKey: "image",
    header: "Imagine profil",
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
    meta: { headerText: "Imagine profil" },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opțiuni</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log(row.original.email)}>
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: { headerText: "Opțiuni" },
  },
];
