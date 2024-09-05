"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMyProjectData } from "@/hooks/useMyProjectData";
import { format } from "date-fns";
import { MenuItem } from "../team/TeamMembersContainer";

const MyProjectCard = () => {
  const { data: myProjectData } = useMyProjectData();

  if (!myProjectData) return null;

  return (
    <Card className="w-full rounded-lg bg-white p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Proiectul tău de diplomă
        </CardTitle>
        <CardDescription className="text-gray-600">
          început la data:{" "}
          {format(new Date(myProjectData?.createdAt), "dd.MM.yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <MenuItem
          rowTitle="Nume Proiect"
          rowValue={myProjectData?.projectName as string}
        />
        <h2 className="text-lg font-semibold">Descriere:</h2>
        {/* help me here when text is long to go on next line not to make my card longer */}
        <p className="h-auto break-words text-gray-700">
          {myProjectData?.projectDescription}
        </p>
      </CardContent>
    </Card>
  );
};

export default MyProjectCard;
