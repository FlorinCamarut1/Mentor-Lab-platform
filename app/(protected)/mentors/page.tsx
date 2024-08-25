"use client";
import Header from "@/components/common/Header";
import SendMessageBadge from "@/components/common/SendMessageBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMyMentorData } from "@/hooks/teachers/useMyMentorData";

import { FaFacebook, FaGithub } from "react-icons/fa6";
import { Linkedin, Mail, Phone } from "lucide-react";
import { useMyProjectData } from "@/hooks/useMyProjectData";
import { format } from "date-fns";
import { MenuItem } from "@/components/team/TeamMembersContainer";

import Link from "next/link";
import Loading from "@/app/loading";

const MyMentorPage = () => {
  const { data: myMentorData } = useMyMentorData();
  const { data: myProjectData } = useMyProjectData();

  if (!myMentorData || !myProjectData) {
    return <Loading />;
  }

  return (
    <div className="m-auto max-w-[1200px]">
      <Header
        title="Mentorul tău"
        subtitle="Crează o licență de neuitat alături de mentorul tău"
      />
      <div className="grid grid-cols-1 items-center justify-center gap-4 rounded-lg bg-gray-50 p-6 lg:grid-cols-2">
        <Card className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <SendMessageBadge sendMessageTo={myMentorData?.id} />
          {/* Mentor Image and Name */}
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="mb-4 h-32 w-32">
              <AvatarImage src={myMentorData?.image} alt={myMentorData?.name} />
              <AvatarFallback>{myMentorData?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">
              {myMentorData?.name}
            </CardTitle>
          </CardHeader>

          {/* Mentor Contact Information */}
          <CardContent className="mt-4 flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-600" />
              <span>{myMentorData?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-600" />
              <span>
                {myMentorData?.phoneNumber || "nu există număr de telefon"}
              </span>
            </div>
          </CardContent>

          {/* Social Links */}
          <CardFooter className="mt-6 flex justify-center space-x-6">
            <Button variant="ghost" asChild>
              <Link
                href={myMentorData?.gitHubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-6 w-6" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href={myMentorData?.linkedlnUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href={myMentorData?.facebookUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="h-6 w-6" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full rounded-lg bg-white p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Proiectul tău de diplomă
            </CardTitle>
            <CardDescription className="text-gray-600">
              început la data:{" "}
              {format(new Date(myProjectData?.createdAt), "dd LLLL yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <MenuItem
              rowTitle="Nume Proiect"
              rowValue={myProjectData?.projectName}
            />
            <h2 className="text-lg font-semibold">Descriere:</h2>
            {/* help me here when text is long to go on next line not to make my card longer */}
            <p className="h-auto break-words text-gray-700">
              {myProjectData?.projectDescription}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyMentorPage;
