import { config } from "dotenv";
import { Client } from "@notionhq/client";
import sleep from "../utils/sleep";

config({ path: [".env.local", ".env"] });

export enum notionDB {
  LOG,
  TASKS,
  WINS,
}

const databaseIdMap = {
  [notionDB.LOG]: process.env.NOTION_LOG_DATABASE_ID,
  [notionDB.TASKS]: process.env.NOTION_TASKS_DATABASE_ID,
  [notionDB.WINS]: process.env.NOTION_WINS_DATABASE_ID,
};

export const addItemToDatabase = async (
  item: string,
  database: notionDB,
  options?: { dryRun?: boolean; error?: boolean }
): Promise<void> => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  if (options?.error) {
    throw new Error("Oh no!");
  }

  if (options?.dryRun) {
    await sleep(1000);
    return;
  }

  const databaseId = databaseIdMap[database];

  if (!databaseId) {
    throw new Error("Could not find database ID");
  }

  const newPage = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        type: "title",
        title: [{ type: "text", text: { content: item } }],
      },
    },
  });

  if (!newPage.id) {
    throw new Error("Could not create item in database");
  }
};
