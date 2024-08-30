import { FaGraduationCap } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center">
      <div className="animate-spin-slow relative h-28 w-28 animate-bounce">
        <div className="absolute inset-0 rounded-full bg-primary" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary-foreground">
          <FaGraduationCap size={80} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
