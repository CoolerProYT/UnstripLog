# JEI & multiplayer

## JEI

With [JEI](https://modrinth.com/mod/jei) installed, Unstrip Log adds two recipe pages:

- **Stripping**: a log, the stripped block it turns into, and the item it drops. Every axe is listed as the tool, so looking up the uses of an axe shows every log it can strip.
- **Unstripping**: a stripped block, the item that unstrips it, and the block you get back.

Both pages list the logs in [`unstrip-detailed.json`](../config/unstrip-detailed), plus every other strippable log when [`allowUnknownLog`](../config/common) is on. Each bark type shows up as its own entry in the item list, so you can look up which logs drop Spruce Bark.

::: tip
JEI builds its pages when you join a world. After editing the config, rejoin to see the changes in JEI.
:::

## Multiplayer

The server's config is what counts. When a player joins, the server sends them its common config, bark types and log entries, and it sends them again whenever the server's `unstrip-detailed.json` or common config changes. Players do not need to copy the server's config files, and their own local config is ignored while they are connected.

What the server sends is used for:

- which bark types appear in the creative menu
- the JEI pages

The textures and names for a [new bark type](../config/bark-types) are not sent. Every player needs the resource pack that provides them, or the server can send it as a server resource pack.
