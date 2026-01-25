import { Locale } from "@/lib/notion/queries/blog";
import { messages } from "@/lib/i18n";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function PageViews({ slug, locale }: { slug: string; locale: Locale }) {
  let views = 0;

  try {
    const keys = await redis.keys(`${slug}*`);

    // Yanlış kayıt edilmiş key'leri filtrele (API route'daki aynı logic)
    const isValidKey = (key: string): boolean => {
      if (key.includes(".")) return false;
      const colonIndex = key.indexOf(":");
      if (colonIndex !== -1 && colonIndex === key.length - 1) return false;
      const prefix = `${slug}`;
      if (key.startsWith(prefix)) {
        const pathAfterSlug = key.substring(prefix.length);
        if (pathAfterSlug.length > 0 && /^[A-Z]/.test(pathAfterSlug)) {
          return false;
        }
      }
      return true;
    };

    const filteredKeys = keys.filter(isValidKey);

    for (const key of filteredKeys) {
      const data = await redis.hgetall<{ views?: number }>(key);
      views += Number(data?.views || 0);
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
