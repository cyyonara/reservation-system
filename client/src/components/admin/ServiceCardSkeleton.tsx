type Props = { count: number };

const ServiceCardSkeleton: React.FC<Props> = ({ count }: Props) => {
  const skeletonCount = Array(count).fill(null);

  return (
    <>
      {skeletonCount.map((_, i) => {
        return (
          <div
            key={i}
            className="border animate-pulse w-full h-auto md:h-[352px] md:w-[352px] flex flex-col rounded-full"
          >
            <div className="h-[280px] md:h-[210px] rounded-md w-full p-[2px] bg-gray-400"></div>
            <div className="flex flex-1 px-0 py-3 flex-col text-gray-800 gap-y-1">
              <div className="flex justify-between items-center gap-x-4 mb-2">
                <span className="bg-gray-red-800 h-[18px] w-full rounded-full"></span>
                <span className="bg-gray-400 h-[18px] w-[100px] rounded-full"></span>
              </div>
              <span className="bg-gray-400 h-[18px] rounded-full"></span>
              <span className="bg-gray-400 h-[18px] rounded-full"></span>
              <span className="mt-4 flex justify-between items-center">
                <button className="h-[18px] w-[75px] rounded-full bg-gray-400"></button>
                <span className="h-[18px] w-[50px] bg-gray-400 rounded-full"></span>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ServiceCardSkeleton;
