"use client";

import { FaFilePdf } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "@/hooks/useSession";

import Loading from "@/app/loading";
import useCvByTeacherId from "@/hooks/CV/useCvByTeacherId";
import timeElapsedSince from "@/utils/timeElapseSince";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import AlertDeleteDialog from "../common/AlertDeleteDialog";

const TeacherCVInfo = () => {
  const { data: sessionData } = useSession();
  const { data: CvUserData, mutate: mutateCV } = useCvByTeacherId(
    sessionData?.user?.id as string,
  );
  const router = useRouter();
  const updatedAt = timeElapsedSince(CvUserData?.updatedAt);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const deleteCV = () => {
    setIsLoading(true);
    axios
      .delete(`/api/deleteCV/${CvUserData?.id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.success);
          router.refresh();
          mutateCV();
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  if (!CvUserData?.pdfHostedUrl) return;

  return (
    <div className="mt-4 w-full rounded-md border-[1px] border-gray-200 p-2 shadow-md">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AlertDeleteDialog
            dialogOpen={openDeleteDialog}
            onDialogOpen={setOpenDeleteDialog}
            deleteFn={deleteCV}
          />
          <h3 className="font-semibold text-gray-600">
            Există un CV atașat acestui profil:
          </h3>

          <p className="text-gray-400">
            {CvUserData?.createdAt === CvUserData?.updatedAt
              ? "Adăugat acum "
              : "Actualizat acum "}
            <span className="font-semibold text-gray-600">{updatedAt}</span>
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 md:flex-row">
              <p className="text-gray-400">
                Vezi CV-ul apăsând pe iconița PDF:
              </p>
              <Link
                href={CvUserData?.pdfHostedUrl || ""}
                target="_blank"
                rel="preload"
              >
                <FaFilePdf size={40} color="brown" />
              </Link>
            </div>
            <FaTrash
              size={20}
              className="mt-auto cursor-pointer"
              onClick={() => setOpenDeleteDialog(true)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherCVInfo;
