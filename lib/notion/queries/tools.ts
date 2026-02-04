import { PageObjectResponse } from "@notionhq/client";
import { notion } from "../client";
import { hasProperties } from "../types";
import { cache } from "react";

export type Locale = "tr" | "en";

export type ToolCategory = "Smartphone" | "Productivity" | "Coding" | "Accessiories" | "Life" | "Software" | "AI";

export type ToolItem = {
    id: string;
    name: string;
    description: string;
    category: ToolCategory;
    locale: Locale;
    url: string;
    cover?: string;
};

type ToolProperties = {
    Name?: { type?: "title"; title: { plain_text: string }[] };
    Description?: { type?: "rich_text"; rich_text: { plain_text: string }[] };
    Category?: { type?: "select"; select: { name: string } | null };
    Locale?: { type?: "select"; select: { name: string } | null };
    URL?: { type?: "url"; url: string | null };
};

function firstPlainText(arr?: { plain_text: string }[]) {
    return arr?.[0]?.plain_text ?? "";
}

export const getTools = cache(async (
    locale: Locale,
): Promise<ToolItem[]> => {
    try {
        const dataSourceId = process.env.NOTION_TOOLS_DATASOURCE_ID || "";

        const response = await notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                property: "Locale",
                select: { equals: locale },
            },
            sorts: [
                {
                    timestamp: "created_time",
                    direction: "ascending",
                },
            ],
        });

        const items = response.results
            .map((page) => {
                if (!hasProperties(page)) return null;

                const pageWithProps = page as PageObjectResponse;
                const properties = pageWithProps.properties as ToolProperties;

                const category = properties.Category?.select?.name as ToolCategory;
                if (!category) return null;

                const cover = pageWithProps.cover
                    ? pageWithProps.cover.type === "file"
                        ? pageWithProps.cover.file.url
                        : pageWithProps.cover.type === "external"
                            ? pageWithProps.cover.external.url
                            : undefined
                    : undefined;

                return {
                    id: pageWithProps.id,
                    name: firstPlainText(properties.Name?.title),
                    description: firstPlainText(properties.Description?.rich_text),
                    category,
                    locale,
                    url: properties.URL?.url || "",
                    cover,
                } as ToolItem;
            })
            .filter((item): item is ToolItem => item !== null);

        return items;
    } catch (error) {
        console.error("Error fetching tools:", error);
        return [];
    }
});

export const getToolsByCategory = cache(async (
    locale: Locale,
): Promise<Record<ToolCategory, ToolItem[]>> => {
    const tools = await getTools(locale);

    const grouped: Record<ToolCategory, ToolItem[]> = {
        Smartphone: [],
        Productivity: [],
        Coding: [],
        Accessiories: [],
        Life: [],
        Software: [],
        AI: [],
    };

    for (const tool of tools) {
        if (grouped[tool.category]) {
            grouped[tool.category].push(tool);
        }
    }

    return grouped;
});
