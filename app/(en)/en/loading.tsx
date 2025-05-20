import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className={
        "flex flex-col items-center h-full w-full justify-center space-y-5 p-40"
      }
    >
      <HashLoader color="#4781FF" speedMultiplier={2} />
    </div>
  );
};

export default Loading;
