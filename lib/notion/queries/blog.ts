import { PageObjectResponse } from "@notionhq/client";
import { notion } from "../client";
import { hasProperties, NotionItem, ProcessedBlock } from "../types";
import { getAllBlocks } from "../blocks";

export type Locale = "tr" | "en";


type WritingProperties = {
  Name?: { type?: "title"; title: { plain_text: string }[] };
  Date?: { type?: "date"; date: { start: string } | null };
  Published?: { type?: "date"; date: { start: string } | null };
  URL?: { type?: "url"; url: string | null };
  Slug?: { type?: "rich_text"; rich_text: { plain_text: string }[] };
  Status?: { status: { name: string } | null };

  // ✅ multi-lang için:
  Locale?: { type?: "select"; select: { name: string } | null };
  PostId?: { type?: "rich_text"; rich_text: { plain_text: string }[] };
};

function firstPlainText(arr?: { plain_text: string }[]) {
  return arr?.[0]?.plain_text ?? "";
}


// Get random posts efficiently without fetching all posts
export async function getRandomWritingPosts(
  locale: Locale,
  count: number = 5,
  excludeSlug?: string,
): Promise<NotionItem[]> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";

    // Fetch more posts than needed to have options for randomization
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: Math.min(count * 3, 30), // Fetch 3x needed, max 30
      filter: {
        property: "Locale",
        select: { equals: locale },
      },
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
        const properties = pageWithProps.properties as WritingProperties

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
          locale,
          postId: firstPlainText(properties.PostId?.rich_text),
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
  locale: Locale,
  cursor?: string,
  pageSize: number = 20,
  onlyPublished: boolean = false,
): Promise<{ items: NotionItem[]; nextCursor: string | null }> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: pageSize,
      ...(cursor ? { start_cursor: cursor } : {}),
      filter: {
        and: [{
          property: "Locale",
          select: { equals: locale },
        },
        ...(onlyPublished
          ? [{
              property: "Status",
              status: { equals: "Done" },
            }]
          : []),
        ]
      },
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
      const properties = pageWithProps.properties as WritingProperties

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
        locale,
        postId: firstPlainText(properties.PostId?.rich_text),
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
    const properties = pageWithProps.properties as WritingProperties

    const metadata: NotionItem = {
      id: pageWithProps.id,
      title: properties.Name?.title[0]?.plain_text || "Untitled",
      category: "Writing",
      status: "Published",
      createdTime: pageWithProps.created_time,
      published: properties.Published?.date?.start || pageWithProps.created_time,
      source: properties.URL?.url?.replace("https://", ""),
      slug: properties.Slug?.rich_text[0]?.plain_text || "",
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
  locale: Locale,
  slug: string,
): Promise<{ blocks: ProcessedBlock[]; metadata: NotionItem } | null> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [{
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Locale",
          select: { equals: locale },
        },]
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    if (!hasProperties(page)) return null;

    // Extract metadata directly from query response (no extra pages.retrieve needed)
    const pageWithProps = page as PageObjectResponse;
    const properties = pageWithProps.properties as WritingProperties

    const metadata: NotionItem = {
      id: pageWithProps.id,
      title: properties.Name?.title[0]?.plain_text || "Untitled",
      category: "Writing",
      status: "Published",
      createdTime: pageWithProps.created_time,
      published: properties.Published?.date?.start || properties.Date?.date?.start || pageWithProps.created_time,
      source: properties.URL?.url?.replace("https://", ""),
      slug: properties.Slug?.rich_text[0]?.plain_text || "",
      featureImage:
        pageWithProps.cover && pageWithProps.cover.type === "file"
          ? pageWithProps.cover.file.url
          : pageWithProps.cover && pageWithProps.cover.type === "external"
            ? pageWithProps.cover.external.url
            : undefined,

      locale,
      postId: firstPlainText(properties.PostId?.rich_text),
    };

    const blocks = await getAllBlocks(page.id);

    return { blocks, metadata };
  } catch (error) {
    console.error(`Error fetching writing post content for slug ${slug}:`, error);
    return null;
  }
}


export async function getWritingPostSlugByPostId(
  locale: Locale,
  postId: string,
): Promise<string | null> {
  try {
    const dataSourceId = process.env.NOTION_WRITING_DATASOURCE_ID || "";

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Locale", select: { equals: locale } },
          { property: "PostId", rich_text: { equals: postId } },
        ],
      },
      page_size: 1,
    });

    const page = response.results[0];
    if (!page || !hasProperties(page)) return null;

    const pageWithProps = page as PageObjectResponse;
    const properties = pageWithProps.properties as WritingProperties

    const slug = firstPlainText(properties.PostId?.rich_text)
    return slug || null;
  } catch (error) {
    console.error(`Error fetching writing post slug by postId ${postId}:`, error);
    return null;
  }
}