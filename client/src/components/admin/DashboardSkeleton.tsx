import React from "react";

interface Props {
  count: number;
}

const DashboardSkeleton: React.FC<Props> = ({ count }: Props) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="flex items-center rounded-md gap-x-4 p-4 lg:p6 animate-pulse">
            <div className="w-[45px] h-[45px] bg-gray-400 rounded-full"></div>
            <div className="flex flex-1 flex-col gap-y-2">
              <span className="h-[30px] w-[20%] bg-gray-400 rounded-full"></span>
              <span className="h-[16px] w-[40%] bg-gray-400 rounded-full"></span>
            </div>
          </div>
        ))}
    </>
  );
};

export default DashboardSkeleton;
