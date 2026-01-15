import { PageObjectResponse } from "@notionhq/client";
import { notion } from "../client";
import { hasProperties, NotionItem, ProcessedBlock } from "../types";
import { getAllBlocks } from "../blocks";

// Get random posts efficiently without fetching all posts
export async function getRandomWritingPosts(
  count: number = 5,
  excludeSlug?: string,
): Promise<NotionItem[]> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";

    // Fetch more posts than needed to have options for randomization
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: Math.min(count * 3, 30), // Fetch 3x needed, max 30
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const items = response.results
      .map((page) => {
        if (!hasProperties(page)) return null;

        const pageWithProps = page as PageObjectResponse;
        const properties = pageWithProps.properties as {
          Name?: { title: { plain_text: string }[] };
          Date?: { date: { start: string } | null };
          URL?: { url: string };
          Slug?: { rich_text: { plain_text: string }[] };
          FeatureImage?: { url: string };
        };

        const slug = properties.Slug?.rich_text[0]?.plain_text || "";

        // Exclude current post
        if (excludeSlug && slug === excludeSlug) return null;

        return {
          id: pageWithProps.id,
          title: properties.Name?.title[0]?.plain_text || "Untitled",
          category: "Writing",
          status: "Published",
          createdTime: pageWithProps.created_time,
          published: properties.Date?.date?.start || pageWithProps.created_time,
          source: properties.URL?.url?.replace("https://", ""),
          slug,
          featureImage:
            pageWithProps.cover && "file" in pageWithProps.cover
              ? pageWithProps.cover.file.url
              : undefined,
        } as NotionItem;
      })
      .filter((item): item is NotionItem => item !== null);

    // Shuffle and return requested count
    const shuffled = items.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("Error fetching random writing posts:", error);
    return [];
  }
}

export async function getWritingDatabaseItems(
  cursor?: string,
  pageSize: number = 20,
): Promise<{ items: NotionItem[]; nextCursor: string | null }> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: pageSize,
      ...(cursor ? { start_cursor: cursor } : {}),
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const items = response.results.map((page) => {
      if (!hasProperties(page)) return null;

      const pageWithProps = page as PageObjectResponse;
      const properties = pageWithProps.properties as {
        Name?: { title: { plain_text: string }[] };
        Date?: { date: { start: string } | null };
        URL?: { url: string };
        Slug?: { rich_text: { plain_text: string }[] };
        FeatureImage?: { url: string };
      };

      return {
        id: pageWithProps.id,
        title: properties.Name?.title[0]?.plain_text || "Untitled",
        category: "Writing",
        status: "Published",
        createdTime: pageWithProps.created_time,
        published: properties.Date?.date?.start || pageWithProps.created_time,
        source: properties.URL?.url?.replace("https://", ""),
        slug: properties.Slug?.rich_text[0]?.plain_text || "",
        featureImage:
          pageWithProps.cover && "file" in pageWithProps.cover
            ? pageWithProps.cover.file.url
            : undefined,
      } as NotionItem;
    });

    return {
      items: items.filter((item): item is NotionItem => item !== null),
      nextCursor: response.has_more ? (response.next_cursor as string) : null,
    };
  } catch (error) {
    console.error("Error fetching writing items:", error);
    return { items: [], nextCursor: null };
  }
}


export async function getWritingPostContent(
  pageId: string,
): Promise<{ blocks: ProcessedBlock[]; metadata: NotionItem } | null> {
  try {
    // Fetch page metadata and blocks in parallel for better performance
    const [page, blocks] = await Promise.all([
      notion.pages.retrieve({ page_id: pageId }).then((r) => {
        return r;
      }),
      getAllBlocks(pageId).then((r) => {
        return r;
      }),
    ]);

    if (!hasProperties(page)) return null;

    const pageWithProps = page as PageObjectResponse;
    const properties = pageWithProps.properties as {
      Name?: { title: { plain_text: string }[] };
      Published?: { date: { start: string } | null };
      URL?: { url: string };
      Slug?: { rich_text: { plain_text: string }[] };
      Excerpt?: { rich_text: { plain_text: string }[] };
      FeatureImage?: { url: string };
    };

    const metadata: NotionItem = {
      id: pageWithProps.id,
      title: properties.Name?.title[0]?.plain_text || "Untitled",
      category: "Writing",
      status: "Published",
      createdTime: pageWithProps.created_time,
      published: properties.Published?.date?.start || pageWithProps.created_time,
      source: properties.URL?.url?.replace("https://", ""),
      slug: properties.Slug?.rich_text[0]?.plain_text || "",
      excerpt: properties.Excerpt?.rich_text[0]?.plain_text || "",
      featureImage:
        pageWithProps.cover && pageWithProps.cover.type === "file"
          ? pageWithProps.cover.file.url
          : pageWithProps.cover && pageWithProps.cover.type === "external"
            ? pageWithProps.cover.external.url
            : undefined,
    };

    return { blocks, metadata };
  } catch (error) {
    console.error(`Error fetching writing post content for page ${pageId}:`, error);
    return null;
  }
}

export async function getWritingPostContentBySlug(
  slug: string,
): Promise<{ blocks: ProcessedBlock[]; metadata: NotionItem } | null> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    if (!hasProperties(page)) return null;

    // Extract metadata directly from query response (no extra pages.retrieve needed)
    const pageWithProps = page as PageObjectResponse;
    const properties = pageWithProps.properties as {
      Name?: { title: { plain_text: string }[] };
      Published?: { date: { start: string } | null };
      Date?: { date: { start: string } | null };
      URL?: { url: string };
      Slug?: { rich_text: { plain_text: string }[] };
      Excerpt?: { rich_text: { plain_text: string }[] };
    };

    const metadata: NotionItem = {
      id: pageWithProps.id,
      title: properties.Name?.title[0]?.plain_text || "Untitled",
      category: "Writing",
      status: "Published",
      createdTime: pageWithProps.created_time,
      published: properties.Published?.date?.start || properties.Date?.date?.start || pageWithProps.created_time,
      source: properties.URL?.url?.replace("https://", ""),
      slug: properties.Slug?.rich_text[0]?.plain_text || "",
      excerpt: properties.Excerpt?.rich_text[0]?.plain_text || "",
      featureImage:
        pageWithProps.cover && pageWithProps.cover.type === "file"
          ? pageWithProps.cover.file.url
          : pageWithProps.cover && pageWithProps.cover.type === "external"
            ? pageWithProps.cover.external.url
            : undefined,
    };

    const blocks = await getAllBlocks(page.id);

    return { blocks, metadata };
  } catch (error) {
    console.error(`Error fetching writing post content for slug ${slug}:`, error);
    return null;
  }
}
