import { getRandomInt } from "@/utils/helpers";

interface PageProps {
  length: number;
}

const BookmarkSkeleton: React.FC<PageProps> = ({ length = 2 }) => {
  return (
    <div className="flex flex-col gap-4 my-8">
      <h3 className="text-xl mb-2 text-slate-400 tracking-wide h-6 rounded animate-pulse w-4/12 bg-lightGray mt-4"></h3>
      <div className="flex flex-col gap-8 ">
        {Array.from({ length: length }).map(() => (
          <div
            key={getRandomInt(144, 1000000000)}
            className="flex items-start gap-4 animate-pulse w-full"
          >
            <div className="w-52 h-32 bg-lightGray rounded-lg" />
            <div className="flex flex-col gap-2 w-full">
              <span className="w-7/12 h-4 font-semibold text-lg text-text leading-8 rounded-lg bg-lightGray" />
              <div className="flex flex-col gap-2">
                <p className="text-text h-4 font-normal rounded-lg bg-lightGray w-full" />
                <p className="text-text h-4 font-normal rounded-lg bg-lightGray w-full" />
              </div>
              <div className="text-[#737373] h-4 w-full text-sm flex items-center gap-1">
                <span className="rounded-lg bg-lightGray w-1/12 h-4"></span>
                <span> • </span>
                <span className="rounded-lg bg-lightGray w-1/12 h-4"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-xl mb-2 text-slate-400 tracking-wide h-6 rounded animate-pulse w-4/12 bg-lightGray mt-4"></h3>
      <div className="flex flex-col gap-8 ">
        {Array.from({ length: length }).map(() => (
          <div
            key={getRandomInt(144, 1000000000)}
            className="flex items-start gap-4 animate-pulse w-full"
          >
            <div className="w-52 h-32 bg-lightGray rounded-lg" />
            <div className="flex flex-col gap-2 w-full">
              <span className="w-7/12 h-4 font-semibold text-lg text-text leading-8 rounded-lg bg-lightGray" />
              <div className="flex flex-col gap-2">
                <p className="text-text h-4 font-normal rounded-lg bg-lightGray w-full" />
                <p className="text-text h-4 font-normal rounded-lg bg-lightGray w-full" />
              </div>
              <div className="text-[#737373] h-4 w-full text-sm flex items-center gap-1">
                <span className="rounded-lg bg-lightGray w-1/12 h-4"></span>
                <span> • </span>
                <span className="rounded-lg bg-lightGray w-1/12 h-4"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-xl mb-2 text-slate-400 tracking-wide h-6 rounded animate-pulse w-4/12 bg-lightGray mt-4"></h3>
      <div className="flex flex-col gap-8 ">
        {Array.from({ length: length }).map(() => (
          <div
            key={getRandomInt(144, 1000000000)}
            className="flex items-start gap-4 animate-pulse w-full"
          >
            <div className="w-52 h-32 bg-lightGray rounded-lg" />
            <div className="flex flex-col gap-2 w-full">
              <span className="w-7/12 h-4 font-semibold text-lg text-text leading-8 rounded-lg bg-lightGray" />
              <div className="flex flex-col gap-2">
                <p className="text-text h-4 font-normal rounded-lg bg-lightGray w-full" />
                <p className="text-text h-4 font-normal rounded-lg bg-lightGray w-full" />
              </div>
              <div className="text-[#737373] h-4 w-full text-sm flex items-center gap-1">
                <span className="rounded-lg bg-lightGray w-1/12 h-4"></span>
                <span> • </span>
                <span className="rounded-lg bg-lightGray w-1/12 h-4"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkSkeleton;
