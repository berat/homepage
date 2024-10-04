import { getRandomInt } from "@/utils/helpers";

interface PageProps {
  isPage?: boolean;
  length: number;
}

export const BlogCardSkeleton: React.FC<PageProps> = ({
  length = 1,
  isPage = false,
}) => {
  return (
    <div
      className={`flex gap-4 ${isPage ? "pb-2 items-start flex-wrap" : "pb-2 items-center snap-proximity overflow-x-auto"}`}
    >
      {Array.from({ length: length }).map(() => (
        <article
          key={getRandomInt(144, 1000000000)}
          className={`${
            isPage ? "lg:h-[300px]" : "lg:h-[275px]"
          } min-w-[48%] lg:min-w-[31%] h-[240px] relative rounded-lg z-40 bg-gray-200 animate-pulse`}
        >
          <div
            className={"w-full h-[240px] lg:h-full absolute z-10 rounded-lg"}
          >
            <div
              className={`${
                isPage ? "h-[240px] lg:h-[300px]" : "h-[230px] lg:h-[275px]"
              } rounded-lg bg-gray-300`}
            />
            <div
              className={
                "w-full h-full bg-bg-gradient absolute top-0 left-0 rounded-lg"
              }
            />
          </div>
          <div
            className={
              "px-1 w-full absolute z-20 text-center translate-y-[112.5px]"
            }
          >
            <div className={"h-4 bg-gray-300 rounded w-1/3 mx-auto mb-2"}></div>
            <div className={"h-6 bg-gray-300 rounded w-2/3 mx-auto"}></div>
          </div>
        </article>
      ))}
    </div>
  );
};

export const PhotoCardSkeleton: React.FC<PageProps> = ({
  isPage,
  length = 0,
}) => {
  return (
    <div
      className={`flex gap-4 items-start ${
        isPage
          ? "w-full my-8 flex-wrap"
          : "pb-2 snap-proximity overflow-x-auto"
      } `}
    >
      {Array.from({ length: length }).map(() => (
        <div
          key={getRandomInt(144, 1000000000)}
          className="animate-pulse min-w-[48%] lg:min-w-[32%] h-auto min-h-[300px] rounded-lg bg-bg-gradient"
        />
      ))}
    </div>
  );
};
