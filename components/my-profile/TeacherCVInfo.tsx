"use client";
import { User } from "@prisma/client";
import { FaFilePdf } from "react-icons/fa6";

import useCvByTeacherId from "@/hooks/CV/useCvByTeacherId";
import timeElapsedSince from "@/utils/timeElapseSince";
import Link from "next/link";

interface TeacherCVInfoProps {
  currentUserData: User & { pdfHostedUrl?: string };
}
const TeacherCVInfo = ({ currentUserData }: TeacherCVInfoProps) => {
  const { data: CvUserData } = useCvByTeacherId(currentUserData?.id as string);

  const updatedAt = timeElapsedSince(CvUserData?.updatedAt);

  if (!CvUserData?.pdfHostedUrl) return;

  return (
    <div className="mt-4 w-full rounded-md border-[1px] border-gray-200 p-2 shadow-md">
      <h3 className="font-semibold text-gray-600">
        Există un CV atașat acestui profil:
      </h3>

      <p className="text-gray-400">
        {CvUserData?.createdAt === CvUserData?.updatedAt
          ? "Adăugat acum "
          : "Actualizat acum "}
        <span className="font-semibold text-gray-600">{updatedAt}</span>
      </p>
      <div className="flex flex-col gap-2 md:flex-row">
        <p className="text-gray-400">Vezi CV-ul apăsând pe iconița PDF:</p>
        <Link
          href={CvUserData?.pdfHostedUrl || ""}
          target="_blank"
          rel="preload"
        >
          <FaFilePdf size={40} color="brown" />
        </Link>
      </div>
    </div>
  );
};

export default TeacherCVInfo;
