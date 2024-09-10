import Link from "next/link";
import React from "react";
interface AuthFooterProps {
  isOnLogin?: boolean;
}
const AuthFooter = ({ isOnLogin }: AuthFooterProps) => {
  return (
    <footer className="flex w-full justify-center gap-1">
      <p className="text-primary">
        {isOnLogin ? "Nu ai un cont?" : "Ai deja un cont?"}
      </p>
      <Link
        className="font-semibold"
        href={isOnLogin ? "/auth/register" : "/auth/login"}
      >
        {isOnLogin ? "Creează un cont" : "Autentificare"}
      </Link>
    </footer>
  );
};

export default AuthFooter;
