import { getCurrentUser } from "@/actions/getCurrentUser";
import Header from "@/components/common/Header";
import RequestsContainer from "@/components/joinTeacherRequests/RequestsContainer";

const RequestsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="m-auto max-w-[1200px] p-2">
      <Header title="Cererile tale" />
      <RequestsContainer currentUserData={currentUser} />
    </div>
  );
};

export default RequestsPage;
