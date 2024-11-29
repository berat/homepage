const PostSkeleton = () => {
  return (
    <article className="xl:w-[1000px] w-[95%] mx-auto post-content">
      <header className={`w-full lg:w-blog mx-auto`}>
        <div className="animate-pulse">
          <div className="h-8 bg-lightGray rounded w-3/4 lg:w-1/2 mb-2"></div>
          <div className="h-4 bg-lightGray rounded w-1/4 lg:w-1/6"></div>
        </div>
      </header>
      <div className="animate-pulse mt-5 max-h-[650px] rounded-lg bg-lightGray h-[650px]"></div>
      <div className="mb-3 mt-5  w-[96%] mx-auto ">
        {Array.from({ length: 2 }).map((_block, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-4 bg-lightGray rounded mb-2"></div>
            <div className="h-4 bg-lightGray rounded mb-2"></div>
            <div className="h-4 bg-lightGray rounded mb-2"></div>
            <br />
            <div className="h-4 bg-lightGray rounded mb-2"></div>
            <div className="h-4 bg-lightGray rounded mb-2"></div>
            <div className="h-4 bg-lightGray rounded mb-2"></div>
            <div className="h-4 bg-lightGray rounded mb-2"></div>
          </div>
        ))}
      </div>
    </article>
  );
};
export default PostSkeleton;
