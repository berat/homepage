import SectionTitle from "@/components/base/Title";
import { messages } from "@/lib/i18n";
import { Locale } from "@/lib/notion/queries/blog";

export function RandomPostsSkeleton({ locale }: { locale: Locale }) {
  const texts = messages[locale];

  return (
    <div className="flex flex-col gap-5 mt-14">
      <SectionTitle title={texts.readNext} />
      <ul className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="flex">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-full max-w-md" />
          </li>
        ))}
      </ul>
    </div>
  );
}
