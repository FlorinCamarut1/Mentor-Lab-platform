import { getCurrentUser } from "@/actions/getCurrentUser";

import Header from "@/components/common/Header";
import TeamMembersContainer from "@/components/team/TeamMembersContainer";

const TeamPage = async () => {
  const currentUserData = await getCurrentUser();
  return (
    <div className="bg-background p-2 text-foreground">
      <Header title="Echipa ta" />
      <div className="p-6">
        <TeamMembersContainer currentUserData={currentUserData!} />
      </div>
    </div>
  );
};

export default TeamPage;
