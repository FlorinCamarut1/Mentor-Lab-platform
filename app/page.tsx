"use client";

import AboutSection from "@/components/home/AboutSection";
import AreYouReadySection from "@/components/home/AreYouReadySection";
import Footer from "@/components/home/Footer";
import HeaderSection from "@/components/home/HeaderSection";
import TryUsOutSection from "@/components/home/TryUsOutSection";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeaderSection />
        <AboutSection />
        <TryUsOutSection />
        <AreYouReadySection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
