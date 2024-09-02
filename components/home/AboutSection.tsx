import { BookOpenIcon, SearchIcon, UsersIcon } from "lucide-react";
import React from "react";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Cum Funcționează Mentor-Lab
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <SearchIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Potrivire bazată pe GPT</h3>
            <p className="text-gray-500">
              GPT-ul nostru avansat analizează obiectivele tale academice pentru
              a găsi mentorul perfect.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <UsersIcon className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Mentori Experți</h3>
            <p className="text-gray-500">
              Conectează-te cu profesioniști și academicieni cu experiență în
              domeniul tău de studiu.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-purple-100 p-3">
              <BookOpenIcon className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Îndrumare Personalizată</h3>
            <p className="text-gray-500">
              Primește sfaturi personalizate și resurse pentru a excela în
              programul tău de licență.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
