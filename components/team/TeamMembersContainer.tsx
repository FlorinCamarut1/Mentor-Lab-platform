"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { AcceptedStudent, User } from "@prisma/client";
import { Input } from "../ui/input";
import { useTeacherAcceptedStudents } from "@/hooks/teachers/useTeacherAcceptedStudents";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useCurrentUserData } from "@/hooks/users/useCurrentUserData";

import timeElapsedSince from "@/utils/timeElapseSince";
import Image from "next/image";
import SendMessageBadge from "../common/SendMessageBadge";

const TeamMembersContainer = () => {
  const { data: currentUserData } = useCurrentUserData();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: teacherTeamMembers } = useTeacherAcceptedStudents(
    currentUserData?.id as string,
  );

  const filteredTeamMembers = teacherTeamMembers?.[0]?.students?.filter(
    (student: AcceptedStudent & { studentData: User }) =>
      student?.studentData?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  if (!teacherTeamMembers?.[0]?.students)
    return (
      <h1 className="text-center text-lg text-gray-500">
        Nu există membrii momentan.
      </h1>
    );

  return (
    <>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Caută un membru..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg bg-muted px-4 py-2 text-muted-foreground"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTeamMembers?.map(
          (member: AcceptedStudent & { studentData: User }, index: number) => (
            <Card
              key={index}
              className="relative overflow-hidden rounded-lg bg-background shadow-lg"
            >
              <SendMessageBadge sendMessageTo={member?.studentId} />
              <div className="flex items-center justify-center bg-gray-300 p-4">
                <Image
                  src={member?.studentData?.image || "/images/placeholder.png"}
                  alt={member?.studentData?.name as string}
                  width={400}
                  priority
                  height={400}
                  className="h-48 w-48 rounded-full border-[10px] border-white object-cover"
                  style={{ aspectRatio: "400/400", objectFit: "cover" }}
                />
              </div>
              <CardContent className="p-4">
                <MenuItem
                  rowTitle="Nume"
                  rowValue={member?.studentData?.name as string}
                />
                <MenuItem
                  rowTitle="Email"
                  rowValue={member?.studentData?.email as string}
                />
                <MenuItem rowTitle="Proiect" rowValue={member?.projectName} />
                <MenuItem
                  rowTitle="S-a alăturat acum"
                  rowValue={timeElapsedSince(member?.createdAt) as string}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Vezi detalii proiect</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Nume Proiect: {member?.projectName}
                      </DialogTitle>
                      <DialogDescription>
                        <span className="font-semibold text-gray-600">
                          Descriere Proiect:
                        </span>{" "}
                        {member?.projectDescription}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </>
  );
};

export default TeamMembersContainer;

export const MenuItem = ({
  rowTitle,
  rowValue,
}: {
  rowTitle: string;
  rowValue: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-nowrap font-semibold text-black">{rowTitle}:</span>{" "}
      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg text-gray-600">
        {rowValue}
      </p>
    </div>
  );
};
