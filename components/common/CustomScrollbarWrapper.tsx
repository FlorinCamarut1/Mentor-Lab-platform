import Loading from "@/app/loading";

interface CustomScrollbarWrapperProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const CustomScrollbarWrapper = ({
  isLoading,
  children,
  className,
}: CustomScrollbarWrapperProps) => {
  return (
    <div
      className={` ${className} overflow-y-auto p-2 scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full`}
    >
      {isLoading ? <Loading /> : <>{children}</>}
    </div>
  );
};

export default CustomScrollbarWrapper;
