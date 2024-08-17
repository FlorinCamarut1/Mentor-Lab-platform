"use server";
import React from "react";

const NotFound = async () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="text-9xl font-bold text-primary">404</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ooops... pagina pe care o cauți nu există!
        </h1>
        <div className="mt-6">
          <img
            src="/images/404-not-found.svg"
            alt="404 Error"
            width={400}
            height={300}
            className="mx-auto rounded-lg"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
        </div>
        <div className="mt-6">
          <a
            href={"/"}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            &larr; Pagina precedentă
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
