import { getCurrentUser } from "@/actions/getCurrentUser";
import Header from "@/components/common/Header";
import RequestsContainer from "@/components/joinTeacherRequests/RequestsContainer";

const RequestsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header title="Cererile tale" />
      <RequestsContainer currentUserData={currentUser} />
    </>
  );
};

export default RequestsPage;
