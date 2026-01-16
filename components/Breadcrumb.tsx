import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { Locale } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();

  const findLocale = useMemo(() => {
    return pathname.split("/")[1];
  }, [pathname]);

  const findCurrentPage = useMemo(() => {
    return NAVIGATION_ITEMS.pages.find(
      (item) => {
        return pathname.includes(item.url as string);
      },
      [pathname]
    );
  }, [pathname]);

  return (
    <nav aria-label="Breadcrumb">
      {pathname !== ("/" + findLocale) && (
        <Link href={"/" + findLocale} className="font-semibold text-primary">
          Berat Bozkurt
        </Link>
      )}
      {findCurrentPage && (
        <>
          <span className=" text-gray mx-3">/</span>
          <Link
            className="font-semibold text-primary"
            href={("/" + findLocale + findCurrentPage.url) as string}
          >
            {findCurrentPage[findLocale as Locale]}
          </Link>
        </>
      )}
    </nav>
  );
};
export default Breadcrumb;
