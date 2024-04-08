# Noshun

A CLI tool to quickly add things to the Activity Log and Tasks databases in Notion.

# How to use

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