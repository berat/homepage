import { DatabaseObjectResponse } from "@notionhq/client";
import { notion } from "./client";

// Cache for database ID -> data source ID mapping
const dataSourceIdCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
    if (dataSourceIdCache.has(databaseId)) {
        return dataSourceIdCache.get(databaseId)!;
    }

    const database = (await notion.databases.retrieve({
        database_id: databaseId,
    })) as DatabaseObjectResponse;

    const dataSourceId = database.data_sources[0]?.id;
    if (!dataSourceId) {
        throw new Error(`No data source found for database ${databaseId}`);
    }

    dataSourceIdCache.set(databaseId, dataSourceId);
    return dataSourceId;
}