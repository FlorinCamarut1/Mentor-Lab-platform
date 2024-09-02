import { getCurrentUser } from "@/actions/getCurrentUser";
import { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/common/Header";
import ConversationsBar from "@/components/conversations/ConversationsBar";
import SmallSkeleton from "@/components/common/skeletons/SmallSkeleton";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}
const ConversationsLayout = async ({ children }: ConversationsLayoutProps) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Header title="Conversațiile tale" />
      <div className="grid lg:grid-cols-3 lg:gap-4">
        <Suspense fallback={<SmallSkeleton />}>
          <ConversationsBar currentUser={currentUser!} />
        </Suspense>

        <div className="lg:col-span-2">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
};
export default ConversationsLayout;
