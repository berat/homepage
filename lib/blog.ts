import { getWritingDatabaseItems } from "./notion";
import { NotionItem } from "./notion/types";

export async function getAllWritingPosts(): Promise<NotionItem[]> {
    let allPosts: NotionItem[] = [];
    let cursor: string | undefined;
    let hasMore = true;

    while (hasMore) {
        const { items, nextCursor } = await getWritingDatabaseItems(cursor, 100);
        allPosts = [...allPosts, ...items];
        cursor = nextCursor || undefined;
        hasMore = !!nextCursor;
    }

    return allPosts;
}