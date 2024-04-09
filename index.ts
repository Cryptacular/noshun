import { config } from "dotenv";
import { program } from "@commander-js/extra-typings";
import ora from "ora";
import { addItemToDatabase } from "./services/notionService";

config({ path: [".env.local", ".env"] });

const runCommandWithSpinner = async (spinnerText: string, fn: Function) => {
  const spinner = ora(spinnerText).start();
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
