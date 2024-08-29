import { getCurrentUser } from "@/actions/getCurrentUser";
import { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/common/Header";
import TeamMembersContainer from "@/components/team/TeamMembersContainer";

const TeamPage = async () => {
  const currentUserData = await getCurrentUser();
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-background p-2 text-foreground">
        <Header title="Echipa ta" />
        <div className="p-6">
          <TeamMembersContainer currentUserData={currentUserData!} />
        </div>
      </div>
    </Suspense>
  );
};

export default TeamPage;
