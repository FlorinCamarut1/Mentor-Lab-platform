import { getCurrentUser } from "@/actions/getCurrentUser";
import { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/common/Header";
import RequestsContainer from "@/components/joinTeacherRequests/RequestsContainer";

const RequestsPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Suspense fallback={<Loading />}>
      <Header title="Cererile tale" />
      <RequestsContainer currentUserData={currentUser} />
    </Suspense>
  );
};

export default RequestsPage;
