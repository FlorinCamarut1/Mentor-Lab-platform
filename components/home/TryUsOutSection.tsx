import Image from "next/image";
import React from "react";

const TryUsOutSection = () => {
  return (
    <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-10 px-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Încearcă GPT-ul Nostru
            </h2>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experimentează puterea potrivirii noastre bazate pe GPT 3.5. Pune
              o întrebare și vezi cum Mentor-Lab te poate ajuta să găsești
              mentorul perfect.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <Image
              className="h-full w-full"
              src={"/images/try-us-out.png"}
              alt="Try us out"
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryUsOutSection;
