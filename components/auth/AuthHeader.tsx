import { FaGraduationCap } from "react-icons/fa6";
import React from "react";

interface AuthHeaderProps {
  isOnLogin?: boolean;
}

const AuthHeader = ({ isOnLogin }: AuthHeaderProps) => {
  return (
    <header className="flex flex-col items-center">
      <div className=" flex gap-2 items-center justify-center ">
        <FaGraduationCap size={80} />
        <h1 className="text-3xl font-Oswald font-bold">Mentor Lab</h1>
      </div>
      <p className="font-onest font-semibold text-primary">
        {isOnLogin ? "Autentificare" : "Crează un cont"}
      </p>
    </header>
  );
};

export default AuthHeader;
