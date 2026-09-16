# FAQ

## Stripping a log drops nothing

- The log has no entry in [`unstrip-detailed.json`](./config/unstrip-detailed) and [`allowUnknownLog`](./config/common) is `false`.
- You are holding a shield in your off hand. Sneak, or move the shield, like in vanilla.
- The log comes from a mod that strips logs with its own code, so it is not detected. Add an entry for it.

## My bark will not unstrip a log

The item has to match the log exactly, bark type included. Oak Bark only unstrips oak, and plain Bark only unstrips logs without an entry of their own. A renamed stack will not work either. The [Unstripping table](./guide/stripping#unstripping) shows which item a log needs.

## Why do logs from my other mods drop plain Bark?

The mod only has bark types for vanilla wood. Every other strippable log uses plain Bark, which unstrips any of them. To give a modded wood its own bark, follow [Example: a modded wood](./config/modded-wood).

## Can a log drop something other than bark?

Yes. Set `drop` in its [entry](./config/unstrip-detailed) to any item, for example `minecraft:stick`. For every log without an entry at once, change `item` in the [common config](./config/common).

## Can I stop logs dropping anything?

Set `allowUnknownLog = false` in the [common config](./config/common), and delete the entries you do not want from `unstrip-detailed.json`. An empty array (`[]`) turns off the drop for vanilla logs too.

## I edited `bark-type.json` and nothing changed

That file is only read at startup, so restart the game. It also does not change which logs drop which bark; that is set in [`unstrip-detailed.json`](./config/unstrip-detailed).

## I deleted a config file. How do I get it back?

Restart the game. Missing config files are created again with the defaults.

## Does the server need the mod? Do players?

Both. The mod adds an item, so it has to be installed on the server and on every client. Players get the server's settings when they join. See [Multiplayer](./guide/compat#multiplayer).

## Does it work in singleplayer and on Fabric and NeoForge?

Yes, the mod works the same everywhere.
