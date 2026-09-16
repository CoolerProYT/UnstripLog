# Getting started

Unstrip Log makes stripping a log reversible. Stripping a log with an axe drops a piece of bark, and using that bark on the stripped log puts the bark back.

## Install

1. Install [Fabric](https://fabricmc.net/) with Fabric API, or [NeoForge](https://neoforged.net/), for your Minecraft version.
2. Download Unstrip Log from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/unstriplog) or [Modrinth](https://modrinth.com/mod/unstriplog) and put the jar in your `mods` folder.
3. Optional: add [JEI](https://modrinth.com/mod/jei) to look up what each log drops. See [JEI & multiplayer](./compat).

The mod adds an item, so it is needed on both the server and every client.

::: info Versions
This wiki covers the mod for Minecraft 26.x, on both Fabric and NeoForge. Pick the file that matches your Minecraft version on the download page.
:::

## Try it

**1. Strip a log.** Right-click any log or wood with an axe. Bark for that wood type pops out on top of the block.

**2. Unstrip it.** Hold the bark and right-click the stripped log. The bark is used up and the log gets its bark back.

Pick a wood type to see what it drops:

<StripFlow picker />

The last button stands for logs from other mods. They drop plain Bark, and plain Bark unstrips any of them.

::: tip
Bark only unstrips its own wood. Oak Bark will not turn a stripped birch log back. See [Bark](./bark) for the full list.
:::

## Where to go next

- [Stripping & unstripping](./stripping): exactly which blocks work and what decides the drop
- [Bark](./bark): every bark type, and what else bark is good for
- [Configuration](../config/): change drops, add bark types, or support a modded wood properly
