import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeaderSection = () => {
  const router = useRouter();
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-b from-white to-gray-100 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Găsește-ți Mentorul Perfect cu Mentor-Lab
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Alimentat de GPT 3.5 turbo, Mentor-Lab te conectează cu mentorul
              ideal pentru călătoria ta în programul de licență.
            </p>
          </div>
          <div className="space-x-4">
            <Button onClick={() => router.push("/auth/register")}>
              Începe Acum
            </Button>
            <Button variant="outline">Află Mai Multe</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
