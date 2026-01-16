import { getWritingDatabaseItems } from "./notion";
import { Locale } from "./notion/queries/blog";
import { NotionItem } from "./notion/types";

export async function getAllWritingPosts(locale: Locale): Promise<NotionItem[]> {
    let allPosts: NotionItem[] = [];
    let cursor: string | undefined;
    let hasMore = true;

    while (hasMore) {
        const { items, nextCursor } = await getWritingDatabaseItems(locale, cursor, 100);
        allPosts = [...allPosts, ...items];
        cursor = nextCursor || undefined;
        hasMore = !!nextCursor;
    }

    return allPosts;
}