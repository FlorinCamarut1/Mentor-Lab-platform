"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Image from "next/image";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex max-h-full flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center">
        <div className="text-9xl font-bold text-primary">404</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ooops... pagina pe care o cauți nu există!
        </h1>
        <div className="mt-6">
          <Image
            src="/images/404-not-found.svg"
            alt="404 Error"
            width={400}
            height={300}
            priority
            className="mx-auto h-full w-full rounded-lg"
          />
        </div>
        <div className="mt-6">
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            &larr; Pagina precedentă
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
