"use client";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/common/skeletons/SkeletonCard";
import { useCurrentUserData } from "@/hooks/users/useCurrentUserData";

import RegisterForm from "@/components/auth/RegisterForm";
import Header from "@/components/common/Header";
import ImageUploadAndCrop from "@/components/my-profile/ImageUploadAndCrop";
import UploadCv from "@/components/my-profile/UploadCv";
import TeacherCVInfo from "@/components/my-profile/TeacherCVInfo";
import Loading from "@/app/loading";
import SmallSkeleton from "@/components/common/skeletons/SmallSkeleton";

const MyProfilePage = () => {
  const { data: currentUserData } = useCurrentUserData();

  return (
    <>
      <Header title="Profilul meu" subtitle="Actualizează datele personale" />
      <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2">
        <Suspense fallback={<Loading />}>
          <RegisterForm isEditing={true} />
        </Suspense>

        <div className="flex flex-col gap-4">
          <Suspense fallback={<SkeletonCard />}>
            <ImageUploadAndCrop />
          </Suspense>
          {currentUserData?.role === "TEACHER" && (
            <Suspense fallback={<SmallSkeleton />}>
              <UploadCv />
            </Suspense>
          )}
          {currentUserData?.role === "TEACHER" && (
            <Suspense fallback={<SmallSkeleton />}>
              <TeacherCVInfo />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
