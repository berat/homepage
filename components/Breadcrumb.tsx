import { NAVIGATION_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();

  const findCurrentPage = useMemo(() => {
    return NAVIGATION_ITEMS.pages.find(
      (item) => {
        return pathname.includes(item.url as string)
      },
      [pathname]
    );
  }, [pathname]);

  return (
    <nav aria-label="Breadcrumb">
      <Link href="/" className="font-semibold text-primary">
        Berat Bozkurt
      </Link>
      {findCurrentPage && (
        <>
          <span className=" text-gray mx-3">/</span>
          <Link
            className="font-semibold text-primary"
            href={findCurrentPage.url as string}
          >
            {findCurrentPage.label}
          </Link>
        </>
      )}
    </nav>
  );
};
export default Breadcrumb;
