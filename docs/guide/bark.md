<script setup>
import { data, seconds } from '../.vitepress/theme/unstriplog'
const burn = data.barkBurnTicks
</script>

# Bark

Bark is the item that drops when you strip a log, and the item you use to [unstrip](./stripping#unstripping) it again.

There is a single Bark item. What makes Oak Bark different from Cherry Bark is its **bark type**, stored on the item. The bark type sets its name and texture, and decides which logs it can unstrip. Bark with different types does not stack together.

## Bark types

Every vanilla wood has a bark type of its own. Logs from other mods drop plain Bark, which has no type.

<BarkTable />

Bark types come from the [bark type config](../config/bark-types). You can add your own, for example to give a modded wood its own bark. See [Example: a modded wood](../config/modded-wood).

## Getting bark

- **Strip a log** with an axe. See [what drops](./stripping#what-drops).
- **Creative mode.** Every bark type is in the Ingredients tab.
- **Commands.** Plain bark is `unstriplog:bark`. A typed bark carries its bark type as a component:

```text
/give @s unstriplog:bark
/give @s unstriplog:bark[unstriplog:bark_type={name:"oak",texture:"unstriplog:textures/item/oak_bark.png"}]
```

## Uses

### Unstripping

The main use. See [Stripping & unstripping](./stripping).

### Paper

Two pieces of bark side by side make one paper. Any bark type works, and you can mix types.

<RecipeCard id="paper_from_bark" />

### Fuel

<p v-if="burn">Bark burns in a furnace for <strong>{{ burn }} ticks ({{ seconds(burn) }} seconds)</strong>, enough to smelt {{ burn / 200 }} items. Four pieces of bark cook three items.</p>
