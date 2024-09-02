import { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/common/Header";
import TeamMembersContainer from "@/components/team/TeamMembersContainer";

const TeamPage = () => {
  return (
    <div className="bg-background p-2 text-foreground">
      <Header title="Echipa ta" />
      <div className="p-6">
        <Suspense fallback={<Loading />}>
          <TeamMembersContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default TeamPage;
