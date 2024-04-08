import { config } from "dotenv";
import { program } from "@commander-js/extra-typings";
import ora from "ora";
import { Client } from "@notionhq/client";

config({ path: [".env.local", ".env"] });

const databases = {
  LOG: process.env.NOTION_LOG_DATABASE_ID,
  TASKS: process.env.NOTION_TASKS_DATABASE_ID,
};

const addItemToDatabase = async (
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

const runCommandWithSpinner = async (spinnerText: string, fn: Function) => {
  const options = program.opts();
  const spinner = ora("Adding log to Notion...").start();
  try {
    await fn();
    spinner.succeed("Done!");
  } catch (e: any) {
    spinner.fail(e.message);
  }
};

program
  .name("noshun")
  .description("Adds items to various databases in Notion.")
  .option("--dry-run", "Run command without saving to Notion")
  .option("--error", "Force an error while running command");

program
  .command("log")
  .description("Adds an item to the Activity Log database in Notion")
  .argument("<title...>")
  .action(async (title) => {
    const options = program.opts();
    await runCommandWithSpinner(
      "Adding log to Notion...",
      async () => await addItemToDatabase(title.join(" "), "LOG", options)
    );
  });

program
  .command("task")
  .description("Adds an item to the Tasks database in Notion")
  .argument("<title...>")
  .action(async (title) => {
    const options = program.opts();
    await runCommandWithSpinner(
      "Adding task to Notion...",
      async () => await addItemToDatabase(title.join(" "), "TASKS", options)
    );
  });

program.parse();
