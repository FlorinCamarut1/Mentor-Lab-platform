"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpenIcon, SearchIcon, UsersIcon } from "lucide-react";

import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-white to-gray-100 py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Găsește-ți Mentorul Perfect cu Mentor-Lab
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Alimentat de GPT 3.5 turbo, Mentor-Lab te conectează cu
                  mentorul ideal pentru călătoria ta în programul de licență.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Începe Acum</Button>
                <Button variant="outline">Află Mai Multe</Button>
              </div>
            </div>
          </div>
        </section>
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
                <h3 className="mb-2 text-xl font-bold">
                  Potrivire bazată pe GPT
                </h3>
                <p className="text-gray-500">
                  GPT-ul nostru avansat analizează obiectivele tale academice
                  pentru a găsi mentorul perfect.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <UsersIcon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Mentori Experți</h3>
                <p className="text-gray-500">
                  Conectează-te cu profesioniști și academicieni cu experiență
                  în domeniul tău de studiu.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-purple-100 p-3">
                  <BookOpenIcon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Îndrumare Personalizată
                </h3>
                <p className="text-gray-500">
                  Primește sfaturi personalizate și resurse pentru a excela în
                  programul tău de licență.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-10 px-10 md:grid-cols-2 md:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Încearcă GPT-ul Nostru
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experimentează puterea potrivirii noastre bazate pe AI. Pune o
                  întrebare și vezi cum Mentor-Lab te poate ajuta să găsești
                  mentorul perfect.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-600">
                      AI: Cum te pot ajuta să găsești un mentor astăzi?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Tu: Caut un mentor în informatică.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-600">
                      AI: Excelent! Aș fi încântat să te ajut să găsești un
                      mentor în informatică. Poți să-mi spui mai multe despre
                      interesele tale specifice în domeniul informaticii?
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <form className="flex space-x-2">
                    <Input
                      className="flex-1"
                      placeholder="Scrie mesajul tău..."
                    />
                    <Button type="submit">Trimite</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-primary py-12 text-white md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Gata să-ți Găsești Mentorul?
                </h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Alătură-te Mentor-Lab astăzi și fă primul pas către succesul
                  academic. Platforma noastră bazată pe AI te va potrivi cu
                  mentorul perfect pentru a te ghida în călătoria ta de licență.
                </p>
              </div>
              <Button variant="outline" className="text-primary" size="lg">
                Începe Acum
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
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
    </div>
  );
};

export default HomePage;
