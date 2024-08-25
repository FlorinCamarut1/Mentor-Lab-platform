import { getCurrentUser } from "@/actions/getCurrentUser";

import RegisterForm from "@/components/auth/RegisterForm";
import Header from "@/components/common/Header";
import ImageUploadAndCrop from "@/components/my-profile/ImageUploadAndCrop";
import UploadCv from "@/components/my-profile/UploadCv";
import TeacherCVInfo from "@/components/my-profile/TeacherCVInfo";

const MyProfilePage = async () => {
  const currentUserData = await getCurrentUser();

  return (
    <div className="m-auto min-h-screen max-w-[1200px] p-2">
      <Header title="Profilul meu" subtitle="Actualizează datele personale" />
      <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2">
        <RegisterForm isEditing={true} currentUserData={currentUserData!} />
        <div className="flex flex-col gap-4">
          <ImageUploadAndCrop currentUserData={currentUserData} />
          {currentUserData?.role === "TEACHER" && (
            <UploadCv currentUserData={currentUserData} />
          )}
          {currentUserData?.role === "TEACHER" && (
            <TeacherCVInfo currentUserData={currentUserData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
