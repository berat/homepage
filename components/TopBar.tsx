"use client";

import { memo, useEffect, useState } from "react";
import MenuToggle from "./base/MenuToggle";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHomePage = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={scrollToTop}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm pt-6 px-6 flex items-center gap-5"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="w-11 h-11 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-background/70 transition"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <MenuToggle isOpen={isOpen} />
        </button>
        {!isHomePage && <Breadcrumb />}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="absolute top-0 left-0 bottom-0  p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(TopBar);
