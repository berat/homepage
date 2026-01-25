import Link from "next/link";

const SectionTitle = ({ title, path }: { title: string; path?: string }) => {
  return path ? (
    <Link
      href={path}
      className="uppercase text-gray text-xs md:text-sm tracking-wider font-semibold hover:underline"
    >
      <h6 className="uppercase text-gray text-xs md:text-sm tracking-wider font-extrabold mt-6">
        {title} →
      </h6>
    </Link>
  ) : (
    <h6 className="uppercase text-gray text-xs md:text-sm tracking-wider font-extrabold mt-6">
      {title}
    </h6>
  );
};

export default SectionTitle;
