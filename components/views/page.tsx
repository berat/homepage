import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { getViewAndLike, updateViewAndLike } from "@/lib/redis/views";

export async function PageViews({
  slug,
  locale,
  type,
  increase,
}: {
  type: "post" | "page";
  increase?: boolean;
  slug: string;
  locale: Locale;
}) {
  let views = 0;

  try {
    const { data } = await getViewAndLike(type, slug);
    views = Number(data?.views || 0);

    if (increase) {
      updateViewAndLike(type, slug, "views");
    }
  } catch (e) {
    views = 0;
  }

  const texts = messages[locale];

  return (
    <>
      {Number(views).toLocaleString("tr-TR")} {texts.totalViews}
    </>
  );
}
