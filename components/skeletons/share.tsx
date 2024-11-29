const ShareSkeleton = () => {
  return (
    <div className="xl:w-[1000px] mx-auto flex items-center gap-2.5">
      <div className="animate-pulse flex items-center gap-2 px-4 py-2 rounded-lg bg-lightGray w-24 h-10">
        <div className="bg-warmGray-200 rounded-full w-5 h-5"></div>
        <div className="bg-warmGray-200 rounded w-12 h-4"></div>
      </div>
      <div className="animate-pulse flex items-center gap-2 px-4 py-2 rounded-lg bg-lightGray w-24 h-10">
        <div className="bg-warmGray-200 rounded-full w-5 h-5"></div>
        <div className="bg-warmGray-200 rounded w-12 h-4"></div>
      </div>
      <div className="animate-pulse flex items-center gap-2 px-4 py-2 rounded-lg bg-lightGray w-24 h-10">
        <div className="bg-warmGray-200 rounded-full w-5 h-5"></div>
        <div className="bg-warmGray-200 rounded w-12 h-4"></div>
      </div>
    </div>
  );
};

export default ShareSkeleton;
