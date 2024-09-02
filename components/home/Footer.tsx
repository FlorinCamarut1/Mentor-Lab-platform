import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2023 Mentor-Lab. Toate drepturile rezervate.
      </p>
      <div className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Termeni și Condiții
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Confidențialitate
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
