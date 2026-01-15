import { DatabaseObjectResponse, DataSourceObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialDataSourceObjectResponse, PartialPageObjectResponse, RichTextItemResponse } from "@notionhq/client";

// Generic Notion item metadata
export type NotionItem = {
    id: string;
    title: string;
    category: string;
    status: string;
    createdTime: string;
    published?: string;
    previewBlocks?: ProcessedBlock[];
    source?: string;
    slug?: string;
    excerpt?: string;
    featureImage?: string;
};

// Processed block type for rendering
export type ProcessedBlock = {
    id: string;
    type: string;
    content: RichTextContent[];
    language?: string;
    tableWidth?: number;
    hasColumnHeader?: boolean;
    hasRowHeader?: boolean;
    cells?: RichTextItemResponse[][];
    tableRows?: ProcessedBlock[];
};

// Utility type to extract rich text content
export type RichTextContent = {
    type: string;
    text: {
        content: string;
        link?: string | undefined;
    };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
};


// Type guard to check if a page has properties
export function hasProperties(
    page: PageResponse,
): page is PageObjectResponse | PartialPageObjectResponse {
    return "properties" in page;
}

// Type for any page response (full or partial) - includes data source types for v5 SDK
export type PageResponse =
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
    | DataSourceObjectResponse
    | PartialDataSourceObjectResponse;