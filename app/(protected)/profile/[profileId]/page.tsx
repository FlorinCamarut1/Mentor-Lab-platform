"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaFacebook } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import {
  LinkedinIcon,
  MessageCircleIcon,
  MailIcon,
  PhoneIcon,
  FileTextIcon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useTeacherAcceptedStudents } from "@/hooks/teachers/useTeacherAcceptedStudents";
import { Suspense, useTransition } from "react";
import { createConversation } from "@/actions/conversation/createConversation";
import { SkeletonCard } from "@/components/common/skeletons/SkeletonCard";

import Link from "next/link";
import useUserByEmail from "@/hooks/users/useUserByEmail";
import JoinTeacherForm from "@/components/profile/JoinTeacherForm";
import JoinTeacherBox from "@/components/joinTeacherRequests/JoinTeacherBox";
import TeacherAvaibleSpotsPill from "@/components/profile/TeacherAvaibleSpotsPill";
import useReqByUserId from "@/hooks/joinTeacherRequest/useReqByUserId";
import toast from "react-hot-toast";
import useConversationStore from "@/store/conversationStore";

export default function Component() {
  const email = usePathname().split("/").pop() as string;
  const router = useRouter();
  const conversationStore = useConversationStore();

  const [isPending, startTransition] = useTransition();
  const { data: profileData } = useUserByEmail(email);
  const { data: requestData, mutate: mutateRequestData } = useReqByUserId(
    profileData?.id,
  );
  const { data: teacherAcceptedStudentsData } = useTeacherAcceptedStudents(
    profileData?.id,
  );

  const teacherIsFull =
    teacherAcceptedStudentsData?.[0]?.maxNumberOfStudents ===
    teacherAcceptedStudentsData?.[0]?.currentNumberOfStudents;

  const startConversationHandler = () => {
    startTransition(() => {
      createConversation(profileData?.id).then((res) => {
        if (res.success) {
          router.push(`/conversations?conversation=${res?.conversation?.id}`);
          conversationStore.setMobileConversationBoxOpen(true);
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  return (
    <>
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<SkeletonCard />}>
          <Card className="mx-auto max-w-2xl shadow-lg">
            <CardContent className="p-8">
              <div className="mb-8 flex flex-col items-center">
                <Avatar className="mb-4 h-24 w-24">
                  <AvatarImage
                    src={profileData?.image || "/images/placeholder.png"}
                    alt="avatar image"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">{profileData?.name}</h1>
                <p className="text-gray-600">{profileData?.role}</p>
                <Button className="mt-4" onClick={startConversationHandler}>
                  <MessageCircleIcon className="mr-2 h-4 w-4" /> Trimite-mi un
                  mesaj
                </Button>
              </div>

              <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Date contact</h2>
                <div className="space-y-2">
                  <p className="flex items-center text-gray-600">
                    <MailIcon className="mr-2 h-4 w-4" /> {profileData?.email}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <PhoneIcon className="mr-2 h-4 w-4" />{" "}
                    {profileData?.phoneNumber ||
                      "nu există număr de telefon atașat."}
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">
                  Mă găsești și pe:
                </h2>
                <div className="flex justify-center space-x-4">
                  <a
                    href={profileData?.gitHubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaGithub className="h-6 w-6" />
                  </a>
                  <a
                    href={profileData?.linkedlnUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                  <a
                    href={profileData?.facebookUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                </div>
              </section>
              {profileData?.CV[0]?.pdfHostedUrl && (
                <section className="mb-8">
                  <h2 className="mb-4 text-xl font-semibold">CV</h2>
                  <Button
                    asChild
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <Link
                      href={profileData?.CV[0]?.pdfHostedUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <FileTextIcon className="mr-2 h-4 w-4" /> Vezi CV-ul aici
                    </Link>
                  </Button>
                </section>
              )}

              <div className="mt-8 border-t border-gray-200 pt-8">
                {profileData?.role === "TEACHER" &&
                  teacherAcceptedStudentsData?.[0] && (
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex items-center">
                        <PiStudentFill className="mr-2 h-5 w-5" />
                        <span className="font-semibold text-gray-900">
                          Locuri disponibile
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TeacherAvaibleSpotsPill
                          teacherIsFull={teacherIsFull}
                          current={
                            teacherAcceptedStudentsData?.[0]
                              ?.currentNumberOfStudents
                          }
                          maxNumber={
                            teacherAcceptedStudentsData?.[0]
                              ?.maxNumberOfStudents
                          }
                        />
                      </div>
                    </div>
                  )}

                {!requestData?.[0] &&
                  profileData?.role === "TEACHER" &&
                  !teacherIsFull && (
                    <JoinTeacherForm
                      profileData={profileData}
                      mutateRequestData={mutateRequestData}
                    />
                  )}
                {requestData?.[0] && (
                  <div className="space-y-2">
                    <h2 className="text-gray-700">
                      Ai deja o cerere atașată profesorului {profileData?.name}{" "}
                    </h2>
                    <JoinTeacherBox
                      mutateReqData={mutateRequestData}
                      requestData={requestData?.[0]}
                      isTeacher={false}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </>
  );
}
