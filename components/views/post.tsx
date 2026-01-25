import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function PageViews({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  let views = 0;

  try {
    const data = await redis.hgetall(`${slug}`);
    views = Number(data?.views || 0) + 1;
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
