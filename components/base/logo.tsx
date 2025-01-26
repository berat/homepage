import Link from "next/link";

import Image from "./image";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className={
        "flex gap-2.5 px-3 py-2 items-center rounded hover:bg-lightGray hover:dark:bg-[#2f313a]"
      }
    >
      <Image
        src={"/berat-bozkurt.png"}
        alt={"Berat Bozkurt"}
        rounded="full"
        width={55}
        height={55}
      />
      <div className={"flex flex-col -gap-1"}>
        <h1 className={"text-lg dark:text-white text-black font-semibold "}>
          Berat Bozkurt
        </h1>
        <span className={"text-sm text-disable italic"}>@beratbozkurt0</span>
      </div>
    </Link>
  );
};

export default Logo;
