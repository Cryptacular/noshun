import { program } from "@commander-js/extra-typings";
import ora from "ora";
import { addItemToDatabase, notionDB } from "./services/notionService";

const runCommandWithSpinner = async (spinnerText: string, fn: Function) => {
  const spinner = ora(spinnerText).start();
  try {
    await fn();
    spinner.succeed("Done!");
  } catch (e: any) {
    spinner.fail(e.message);
  }
};

interface CommandMap {
  command: string;
  database: notionDB;
  databaseName: string;
}

const commands: CommandMap[] = [
  {
    command: "log",
    database: notionDB.LOG,
    databaseName: "Activity Log",
  },
  {
    command: "task",
    database: notionDB.TASKS,
    databaseName: "Tasks",
  },
  {
    command: "win",
    database: notionDB.WINS,
    databaseName: "Wins",
  },
];

program
  .name("noshun")
  .description("Adds items to various databases in Notion.")
  .option("--dry-run", "Run command without saving to Notion")
  .option("--error", "Force an error while running command");

for (const cmd of commands) {
  program
    .command(cmd.command)
    .description(`Adds an item to the ${cmd.databaseName} database in Notion`)
    .argument("<title...>")
    .action(async (title) => {
      const options = program.opts();
      await runCommandWithSpinner(
        `Adding item to ${cmd.databaseName} database...`,
        async () =>
          await addItemToDatabase(title.join(" "), cmd.database, options)
      );
    });
}

// program
//   .command("log")
//   .description("Adds an item to the Activity Log database in Notion")
//   .argument("<title...>")
//   .action(async (title) => {
//     const options = program.opts();
//     await runCommandWithSpinner(
//       "Adding log to Notion...",
//       async () => await addItemToDatabase(title.join(" "), notionDB.LOG, options)
//     );
//   });

// program
//   .command("task")
//   .description("Adds an item to the Tasks database in Notion")
//   .argument("<title...>")
//   .action(async (title) => {
//     const options = program.opts();
//     await runCommandWithSpinner(
//       "Adding task to Notion...",
//       async () => await addItemToDatabase(title.join(" "), notionDB.TASKS, options)
//     );
//   });

program.parse();
