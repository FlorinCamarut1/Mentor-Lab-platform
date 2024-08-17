import { auth } from "@/auth";
import { CV, User } from "@prisma/client";

import RegisterForm from "@/components/auth/RegisterForm";
import Header from "@/components/common/Header";
import ImageUploadAndCrop from "@/components/my-profile/ImageUploadAndCrop";
import UploadCv from "@/components/my-profile/UploadCv";
import TeacherCVInfo from "@/components/my-profile/TeacherCVInfo";

const MyProfilePage = async () => {
  const session = await auth();

  console.log(session?.user);

  return (
    <div className="m-auto min-h-screen max-w-[1200px] p-2">
      <Header title="Profilul meu" subtitle="Actualizează datele personale" />
      <div className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
        <RegisterForm
          isEditing={true}
          currentUserData={session?.user as User}
        />
        <div className="flex flex-col gap-4">
          <ImageUploadAndCrop currentUserData={session?.user as User} />
          {session?.user?.role === "TEACHER" && (
            <UploadCv currentUserData={session?.user as User} />
          )}
        </div>
      </div>
      {session?.user?.role === "TEACHER" && (
        <TeacherCVInfo currentUserData={session?.user as User} />
      )}
    </div>
  );
};

export default MyProfilePage;
