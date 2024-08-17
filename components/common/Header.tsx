import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}
const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-end">
      <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
      <h2 className="text-gray-400 md:text-2xl">{subtitle}</h2>
    </header>
  );
};

export default Header;
