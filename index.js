require("dotenv").config({ path: [".env.local", ".env"] });
const { program } = require("commander");
const { Client } = require("@notionhq/client");

const databases = {
  LOG: process.env.NOTION_LOG_DATABASE_ID,
  TASKS: process.env.NOTION_TASKS_DATABASE_ID,
};

const addItemToDatabase = async (item, database) => {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const newPage = await notion.pages.create({
      parent: {
        database_id: databases[database],
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

    console.log("Done!");
  } catch {
    console.error("Oops, something went wrong, try again!");
  }
};

program
  .name("noshun")
  .description("Adds items to various databases in Notion.");

program
  .command("log")
  .description("Adds an item to the Activity Log database in Notion")
  .argument("<title>")
  .action(async (title) => {
    await addItemToDatabase(title, "LOG");
  });

program
  .command("task")
  .description("Adds an item to the Tasks database in Notion")
  .argument("<title>")
  .action(async (title) => {
    await addItemToDatabase(title, "TASKS");
  });

program.parse();
