"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMyMentorData } from "@/hooks/teachers/useMyMentorData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { FaFacebook, FaGithub } from "react-icons/fa6";

import SendMessageBadge from "../common/SendMessageBadge";
import Link from "next/link";

const MentorCard = () => {
  const { data: myMentorData } = useMyMentorData();

  if (myMentorData?.noMentor)
    return (
      <h1 className="text-2xl text-gray-500">
        Nu ești înscris la un mentor momentan.
      </h1>
    );

  return (
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
  );
};

export default MentorCard;
