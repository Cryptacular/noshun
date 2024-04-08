import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { exec } from "node:child_process";

const filePath = "./README.md";
const encoding = "utf-8";
const startComment = "<!-- START: Help text -->";
const codeBlock = "```";

exec("npm run --silent main -- --help", (error, stdout) => {
  if (error) {
    throw new Error(error.message);
  }

  const helpText = stdout;
  const readme = readFileSync(resolve(filePath), encoding);
  const sectionToKeep = readme.split(startComment)[0];

  const newReadme = `${sectionToKeep}${[
    startComment,
    codeBlock,
    helpText,
    codeBlock,
  ].join("\n")}`;

  writeFileSync(filePath, newReadme, encoding);
});
