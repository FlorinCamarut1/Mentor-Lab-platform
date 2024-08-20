import React, { Suspense } from "react";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import Loading from "@/app/loading";

const AuthWrapper = ({
  children,
  isOnLogin = false,
}: {
  children: React.ReactNode;
  isOnLogin?: boolean;
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-full w-full items-center justify-center p-2 md:justify-normal md:p-20">
        <div className="flex h-full w-full flex-col gap-4 rounded-xl px-4 py-10 shadow-2xl md:h-auto md:w-[25rem]">
          <AuthHeader isOnLogin={isOnLogin} />
          {children}
          <AuthFooter isOnLogin={isOnLogin} />
        </div>
      </div>
    </Suspense>
  );
};

export default AuthWrapper;
