import { getRandomWritingPosts, Locale } from "@/lib/notion/queries/blog";
import SectionTitle from "@/components/base/Title";
import ListItem from "@/components/base/List";
import { messages } from "@/lib/i18n";

export async function RandomPosts({
  locale,
  excludeSlug,
}: {
  locale: Locale;
  excludeSlug: string;
}) {
  const randomPosts = await getRandomWritingPosts(locale, 5, excludeSlug);

  const texts = messages[locale];

  return (
    <div className="flex flex-col gap-5 mt-14">
      <SectionTitle title={texts.readNext} />
      <ul className="flex flex-col gap-3">
        {randomPosts.map((post) => (
          <li key={post.id} className="flex">
            <ListItem
              key={post.id}
              title={post.title}
              url={`/${locale}/blog/${post.slug}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
