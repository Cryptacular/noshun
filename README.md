# Noshun

A CLI tool to quickly add things to the Activity Log and Tasks databases in Notion.

# Setup

Make a copy of `.env` and rename it to `.env.local`. Add your values for the environment variables in there. You can get your token by adding a new internal integration [on your Notion workspace's integrations management page](https://www.notion.so/my-integrations). When created, it will show you the `Internal Integration Secret` for you to copy.

To find your database IDs, follow these instructions from the [Notion developer docs](https://developers.notion.com/docs/working-with-databases):

> Open the database as a full page in Notion. Use the Share menu to Copy link. Now paste the link in your text editor so you can take a closer look. The URL uses the following format:
>
> `https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`
>
> Find the part that corresponds to {database_id} in the URL you pasted. It is a 36 character long string. This value is your database ID.

## Alias

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

# How to use

<!-- START: Help text -->
```
Usage: noshun [options] [command]

Adds items to various databases in Notion.

Options:
  --dry-run        Run command without saving to Notion
  --error          Force an error while running command
  -h, --help       display help for command

Commands:
  log <title...>   Adds an item to the Activity Log database in Notion
  task <title...>  Adds an item to the Tasks database in Notion
  help [command]   display help for command

```