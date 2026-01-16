import { NAVIGATION_ITEMS } from "@/constants/navigation";
import SectionTitle from "./base/Title";
import MenuToggle from "./base/MenuToggle";
import { SOCIAL_ITEMS } from "@/constants/config";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { messages } from "@/lib/i18n";
import { getLocaleFromPath } from "@/lib/helpers";

type SidebarProps = {
  onNavigate?: () => void;
};

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const pathname = usePathname();

  const locale = getLocaleFromPath(pathname);

  const texts = messages[locale];
  return (
    <AnimatePresence>
      <motion.nav
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate?.();
          }}
          className="w-11 h-11 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-background/70 transition"
          aria-label="Close menu"
        >
          <MenuToggle isOpen={true} />
        </button>

        <div className="mt-6 space-y-6 px-3">
          <div>
            <a
              href={"/" + locale}
              onClick={onNavigate}
              className="block text-xl font-semibold text-primary hover:text-blue-600 transition"
            >
              {texts.homepage}
            </a>
            <SectionTitle title={texts.pages} />
            <ul className="mt-3 space-y-2">
              {NAVIGATION_ITEMS.pages.map((item) => (
                <li key={item.value}>
                  <a
                    href={"/" + locale + item.url}
                    onClick={onNavigate}
                    className="block text-xl font-semibold text-primary hover:text-blue-600 transition"
                  >
                    {item[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle title={texts.projects} />
            <ul className="mt-3 space-y-2">
              {NAVIGATION_ITEMS.projects.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    onClick={onNavigate}
                    className="block text-xl font-semibold text-primary hover:text-blue-600 transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 items-center my-8">
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.value as string}
                href={item.url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center  "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Sidebar;
