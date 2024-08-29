import { getCurrentUser } from "@/actions/getCurrentUser";

import Header from "@/components/common/Header";
import ConversationsBar from "@/components/conversations/ConversationsBar";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}
const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Header title="Conversațiile tale" />
      <div className="grid lg:grid-cols-3 lg:gap-4">
        <ConversationsBar currentUser={currentUser!} />

        <div className="lg:col-span-2">{children}</div>
      </div>
    </>
  );
};
export default ConversationsLayout;
