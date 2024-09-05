"use client";

import Header from "@/components/common/Header";
import { SkeletonCard } from "@/components/common/skeletons/SkeletonCard";

import MentorCard from "@/components/mentors/MentorCard";
import MyProjectCard from "@/components/mentors/MyProjectCard";
import { Suspense } from "react";

const MyMentorPage = () => {
  return (
    <>
      <Header
        title="Mentorul tău"
        subtitle="Crează o licență de neuitat alături de mentorul tău"
      />
      <div className="grid grid-cols-1 items-center justify-center gap-4 rounded-lg bg-gray-50 p-6 lg:grid-cols-2">
        <Suspense fallback={<SkeletonCard />}>
          <MentorCard />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
          <MyProjectCard />
        </Suspense>
      </div>
    </>
  );
};

export default MyMentorPage;
