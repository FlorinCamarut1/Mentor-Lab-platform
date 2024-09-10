import { FaGraduationCap } from "react-icons/fa6";
import React from "react";

interface AuthHeaderProps {
  isOnLogin?: boolean;
}

const AuthHeader = ({ isOnLogin }: AuthHeaderProps) => {
  return (
    <header className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-2">
        <FaGraduationCap size={80} />
        <h1 className="font-Oswald text-3xl font-bold">Mentor Lab</h1>
      </div>
      <p className="font-onest font-semibold text-primary">
        {isOnLogin ? "Autentificare" : "Creează un cont"}
      </p>
    </header>
  );
};

export default AuthHeader;
