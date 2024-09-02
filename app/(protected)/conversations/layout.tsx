import { Suspense } from "react";

import Loading from "@/app/loading";
import Header from "@/components/common/Header";
import ConversationsBar from "@/components/conversations/ConversationsBar";
import SmallSkeleton from "@/components/common/skeletons/SmallSkeleton";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}
const ConversationsLayout = ({ children }: ConversationsLayoutProps) => {
  return (
    <>
      <Header title="Conversațiile tale" />
      <div className="grid lg:grid-cols-3 lg:gap-4">
        <Suspense fallback={<SmallSkeleton />}>
          <ConversationsBar />
        </Suspense>

        <div className="lg:col-span-2">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
};
export default ConversationsLayout;
