import { getCurrentUser } from "@/actions/getCurrentUser";
import Header from "@/components/common/Header";
import ConversationsBar from "@/components/conversations/ConversationsBar";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}
const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Header title="Conversațiile tale" />
      <div className="flex lg:gap-4">
        <ConversationsBar currentUser={currentUser!} />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};
export default ConversationsLayout;
