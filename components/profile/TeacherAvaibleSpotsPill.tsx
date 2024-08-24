import React from "react";
interface TeacherAvaibleSpotsPillProps {
  current: number;
  maxNumber: number;
  teacherIsFull: boolean;
}
const TeacherAvaibleSpotsPill = ({
  current,
  maxNumber,
  teacherIsFull,
}: TeacherAvaibleSpotsPillProps) => {
  const percentage = Math.min((current / maxNumber) * 100, 100);

  if (teacherIsFull) return <h2>Toate locurile au fost ocupate!</h2>;
  return (
    <div className="flex items-center">
      {/* Outer pill container */}
      <div className="relative h-8 w-32 overflow-hidden rounded-full bg-gray-200">
        {/* Inner fill bar based on percentage */}
        <div
          className="absolute left-0 top-0 h-full bg-primary"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Label displaying the current/max */}
      <span className="ml-2 text-sm text-gray-700">
        {current}/{maxNumber}
      </span>
    </div>
  );
};

export default TeacherAvaibleSpotsPill;
