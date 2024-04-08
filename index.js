require("dotenv").config({ path: [".env.local", ".env"] });
const { program } = require("commander");
const { Client } = require("@notionhq/client");

const addItemToLogDatabase = async (item) => {
  try {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    const newPage = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
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
      return;
    }

    console.log("Done!");
  } catch {
    console.error("Oops, something went wrong, try again!");
  }
};

program
  .name("logr")
  .argument("<item>")
  .description("Adds an item to the Activity Log database in Notion.")
  .action(async (item) => {
    await addItemToLogDatabase(item);
  })
  .parse();
