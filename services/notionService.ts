import { Client } from "@notionhq/client";
import sleep from "../utils/sleep";

const databases = {
  LOG: process.env.NOTION_LOG_DATABASE_ID,
  TASKS: process.env.NOTION_TASKS_DATABASE_ID,
};

export const addItemToDatabase = async (
  item: string,
  database: "LOG" | "TASKS",
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

  const newPage = await notion.pages.create({
    parent: {
      database_id: databases[database]!,
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
