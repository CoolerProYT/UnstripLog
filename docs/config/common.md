# Common config

The common config sets the fallback used by every log that has no entry in the [unstrip detailed config](./unstrip-detailed). With the defaults, that is how modded logs drop plain Bark.

File: `config/unstriplog-common.toml`

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | Item id | `unstriplog:bark` | The item that logs without an entry drop when stripped, and the item that unstrips them. |
| `allowUnknownLog` | Boolean | `true` | Whether logs without an entry use `item` at all. When `false`, they drop nothing and cannot be unstripped. |

The fallback `item` is always a plain item with no components, so it cannot be a typed bark. If the id is not a registered item, the mod logs a warning and uses `unstriplog:bark`.

::: tip
To give one log its own drop instead, add it to the [unstrip detailed config](./unstrip-detailed). Entries there work whatever `allowUnknownLog` is set to.
:::

## Examples

::: code-group

```toml [Default]
item = "unstriplog:bark"
allowUnknownLog = true
```

```toml [Sticks for modded logs]
# Modded logs drop a stick, and a stick unstrips them.
item = "minecraft:stick"
allowUnknownLog = true
```

```toml [Only configured logs]
# Only logs listed in unstrip-detailed.json drop anything or can be unstripped.
item = "unstriplog:bark"
allowUnknownLog = false
```

:::

On NeoForge the file also contains a comment above each option.
