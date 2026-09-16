# Unstrip detailed config

The unstrip detailed config lists logs one by one, with the item each drops when stripped and the item that unstrips it. By default it has an entry for every vanilla log and wood, each dropping its own [bark type](../guide/bark#bark-types).

File: `config/unstriplog/unstrip-detailed.json`. Changes apply as soon as you save the file.

## Build an entry

Fill in the blocks and items, then copy the result into the file.

<EntryBuilder />

## Format

The file is a JSON array of **log entries**.

### Log entry

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | Block id | Yes | The unstripped block, for example `minecraft:oak_log`. Stripping it drops `drop`. |
| `stripped` | Block id | Yes | The block `base` turns into when stripped, for example `minecraft:stripped_oak_log`. Unstripping turns it back into `base`. |
| `drop` | [Item](#item) | Yes | The item dropped when `base` is stripped. |
| `unstrip_item` | [Item](#item) | No | The item that unstrips `stripped`. Leave it out to use `drop`. |

```json
{
  "base": "minecraft:jungle_wood",
  "stripped": "minecraft:stripped_jungle_wood",
  "drop": { "id": "unstriplog:bark" }
}
```

::: warning
Only list a `base` that an axe really strips. The drop is added whenever an axe is used on `base`, so a block the axe does not change would drop an item on every click.
:::

If two entries share the same `stripped` block, the first one is used for unstripping.

### Item

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | Item id | Yes | The item, for example `unstriplog:bark` or `minecraft:paper`. |
| `components` | Object | No | [Data components](https://minecraft.wiki/w/Data_component_format#List_of_components) the item has, keyed by component id. |

Bark gets its type from the `unstriplog:bark_type` component:

| Field | Type | Description |
| --- | --- | --- |
| `name` | String | The bark type name. Sets the item name through the `item.unstriplog.<name>_bark` translation. |
| `texture` | Texture path | The full path of the item texture, for example `unstriplog:textures/item/jungle_bark.png`. |

Both fields are stored on the item itself, so copy them exactly from the matching entry in [`bark-type.json`](./bark-types). If they differ, the dropped bark will not stack with the same bark type from the creative menu.

```json
{
  "base": "minecraft:jungle_wood",
  "stripped": "minecraft:stripped_jungle_wood",
  "drop": {
    "id": "unstriplog:bark",
    "components": {
      "unstriplog:bark_type": {
        "name": "jungle",
        "texture": "unstriplog:textures/item/jungle_bark.png"
      }
    }
  },
  "unstrip_item": {
    "id": "minecraft:paper"
  }
}
```

This entry drops Jungle Bark, but only paper unstrips stripped jungle wood.

::: warning Components must match exactly
The item used to unstrip is compared with all of its components. An item that is renamed, enchanted or damaged, or bark with a different `texture`, will not work.
:::

## Default file

The default file has one entry for each vanilla log, wood, stem, hyphae and bamboo block, in no particular order:

::: code-group

```json [config/unstriplog/unstrip-detailed.json]
[
  {
    "base": "minecraft:jungle_wood",
    "stripped": "minecraft:stripped_jungle_wood",
    "drop": {
      "id": "unstriplog:bark",
      "components": {
        "unstriplog:bark_type": {
          "name": "jungle",
          "texture": "unstriplog:textures/item/jungle_bark.png"
        }
      }
    }
  },
  {
    "base": "minecraft:cherry_log",
    "stripped": "minecraft:stripped_cherry_log",
    "drop": {
      "id": "unstriplog:bark",
      "components": {
        "unstriplog:bark_type": {
          "name": "cherry",
          "texture": "unstriplog:textures/item/cherry_bark.png"
        }
      }
    }
  }
]
```

:::

The real file continues with the other vanilla blocks. Delete it and restart to get it back.

## Common changes

- **Give a modded log its own drop:** add an entry for it. See [Example: a modded wood](./modded-wood).
- **Make a vanilla log drop plain Bark:** remove the `components` from its `drop`.
- **Make a vanilla log use the common config instead:** delete its entry. With `allowUnknownLog` on, it now drops plain Bark.
