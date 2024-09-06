import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const OauthLoginBtn = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        type="button"
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle size={30} />
      </Button>
    </div>
  );
};

export default OauthLoginBtn;
