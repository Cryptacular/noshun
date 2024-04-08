# Noshun

A CLI tool to quickly add things to the Activity Log and Tasks databases in Notion.

# How to use

Add the following line to your `.bashrc` or `.zshrc` to set up the alias, which means you can write `noshun <command> <argument>` without having to navigate to this folder and remember the right command. Make sure to change the folder path to the location of this folder.

```bash
alias noshun="npm --prefix <PROJECT_PATH> run --silent main --"
```

# Help

<!-- START: Help text -->

```
Usage: noshun [options] [command]

Adds items to various databases in Notion.

Options:
  --dry-run       Run command without saving to Notion
  --error         Force an error while running command
  -h, --help      display help for command

Commands:
  log <title>     Adds an item to the Activity Log database in Notion
  task <title>    Adds an item to the Tasks database in Notion
  help [command]  display help for command

```
