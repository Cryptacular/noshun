# Noshun

A CLI tool to quickly add things to the Activity Log and Tasks databases in Notion.

# How to use

Add the following line to your `.bashrc` or `.zshrc` to set up the alias, which means you can write `noshun <command> <argument>` without having to navigate to this folder and remember the right command. Make sure to change the folder path to the location of this folder.

```bash
alias noshun="npm --prefix <PROJECT_PATH> run --silent main --"
```

Notes:

- The command is basically `npm run main` with a few extra options
- `--prefix` allows `npm run` to be in the context of the provided path, which is necessary to run the right script in this project
- `<PROJECT_PATH>` should be replaced with the path of this folder (on Mac you can run `pwd` to find this)
- `--silent` hides the output from `npm run` before the script actually runs
- The `--` at the end ensures that any options you provide after the initial `noshun` command are forwarded onto the actual CLI, rather than `npm`

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
