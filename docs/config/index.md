# Configuration

Unstrip Log has three config files, all in your game's `config` folder. They are created with the defaults the first time the game starts.

| File | Format | What it controls | When changes apply |
| --- | --- | --- | --- |
| [`unstriplog-common.toml`](./common) | TOML | The fallback item for logs with no entry, and whether that fallback is used at all | As soon as the file is saved |
| [`unstriplog/unstrip-detailed.json`](./unstrip-detailed) | JSON | What each log drops, and what unstrips it | As soon as the file is saved |
| [`unstriplog/bark-type.json`](./bark-types) | JSON | The bark types in the creative menu, and the default entries written to `unstrip-detailed.json` | After a restart |

On a server, edit the server's files. Players who join get the server's settings automatically. See [Multiplayer](../guide/compat#multiplayer).

## How the files work together

When an axe strips a log, or bark is used on a stripped log, the mod checks:

1. **`unstrip-detailed.json`** for an entry with that log. If there is one, its items are used and nothing else is checked.
2. **`unstriplog-common.toml`**: if `allowUnknownLog` is on, the log uses the `item` from this file. If it is off, the log drops nothing and cannot be unstripped.

`bark-type.json` is not part of this check. A bark type only affects a log through an entry in `unstrip-detailed.json` that drops that bark type.

## Starting over

The two JSON files are only written when they do not exist. The mod never adds to or repairs them later. To get the defaults back, delete the file and restart the game.

::: warning
The default `unstrip-detailed.json` gives each vanilla wood the bark type of the same name from `bark-type.json`. If you removed or renamed one of those bark types, put it back (or delete `bark-type.json` too) before regenerating.
:::

## Next

- [Example: a modded wood](./modded-wood) walks through all three files to give a modded wood its own bark.
