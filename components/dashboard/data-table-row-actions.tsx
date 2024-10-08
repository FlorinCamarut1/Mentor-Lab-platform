"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { labels } from "../data/data";
import { UserTableType } from "./data/schema";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createConversation } from "@/actions/conversation/createConversation";
import toast from "react-hot-toast";
import useConversationStore from "@/store/conversationStore";

interface DataTableRowActionsProps<TData> {
  row: Row<TData> & { original: UserTableType };
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const conversationStore = useConversationStore();

  const startConversationHandler = () => {
    startTransition(() => {
      createConversation(row?.original?.id).then((res) => {
        if (res.success) {
          router.push(`/conversations?conversation=${res?.conversation?.id}`);
          conversationStore.setMobileConversationBoxOpen(true);
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };
  // const task = UserTableSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={startConversationHandler}>
          Trimite un mesaj
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/profile/${row?.original?.email}`)}
        >
          Vezi profilul
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        {/* <DropdownMenuSeparator />  */}
        {/* <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
