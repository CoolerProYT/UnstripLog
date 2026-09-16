// Pulls wiki data straight from the mod so the docs never drift from the game:
// datagen output (recipes, bark fuel time), the mod's lang file (bark type names) and its item textures.
// Run `./gradlew :neoforge:runData` first when the mod's generated data changes.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const docs = join(dirname(fileURLToPath(import.meta.url)), '..')
const root = join(docs, '..')
const generated = join(root, 'common/src/generated/resources')
const assets = join(root, 'common/src/main/resources/assets/unstriplog')
const data = join(generated, 'data')

if (!existsSync(generated)) {
  console.error(`No datagen output at ${generated}. Run ./gradlew :neoforge:runData first.`)
  process.exit(1)
}

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'))
const jsonFiles = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')).sort() : [])

const lang = readJson(join(assets, 'lang/en_us.json'))

// Item names for mod items, keyed by item id. Typed bark names are keyed by their bark type in `barkTypes`.
const names = {}
for (const [key, value] of Object.entries(lang)) {
  const match = key.match(/^(item|block)\.unstriplog\.([a-z0-9_]+)$/)
  if (match) names[`unstriplog:${match[2]}`] = value
}

// Only the mod's own textures are copied; vanilla items use hosted icons on the page.
const textures = {}
const itemTextures = join(assets, 'textures/item')
mkdirSync(join(docs, 'public/items'), { recursive: true })
for (const file of readdirSync(itemTextures).filter((f) => f.endsWith('.png'))) {
  copyFileSync(join(itemTextures, file), join(docs, 'public/items', file))
  textures[`unstriplog:${basename(file, '.png')}`] = `/items/${file}`
}

// The mod writes one bark type per vanilla wood set into bark-type.json, each with a texture and a lang entry.
const barkTypes = Object.keys(textures)
  .map((id) => id.match(/^unstriplog:([a-z0-9_]+)_bark$/)?.[1])
  .filter(Boolean)
  .map((name) => ({ name, label: lang[`item.unstriplog.${name}_bark`] ?? name, texture: `unstriplog:textures/item/${name}_bark.png` }))
  .sort((a, b) => a.name.localeCompare(b.name))

const ingredient = (value) => {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return ingredient(value[0])
  if (value?.item) return value.item
  if (value?.tag) return `#${value.tag}`
  return '?'
}

const recipes = readdirSync(data).flatMap((namespace) =>
  jsonFiles(join(data, namespace, 'recipe')).map((file) => {
    const json = readJson(join(data, namespace, 'recipe', file))
    const recipe = { id: `${namespace}:${basename(file, '.json')}`, type: json.type, result: { id: json.result?.id, count: json.result?.count ?? 1 } }
    if (json.type === 'minecraft:crafting_shaped') {
      recipe.pattern = json.pattern
      recipe.key = Object.fromEntries(Object.entries(json.key).map(([symbol, value]) => [symbol, ingredient(value)]))
    } else if (json.type === 'minecraft:crafting_shapeless') {
      recipe.ingredients = json.ingredients.map(ingredient)
    } else {
      recipe.ingredient = ingredient(json.ingredient)
      recipe.cookingTime = json.cookingtime
    }
    return recipe
  }),
)

// Burn time in ticks, registered as a constant context int provider.
const fuelFile = join(data, 'unstriplog/context_int_provider/cooking/bark.json')
const barkBurnTicks = existsSync(fuelFile) ? readJson(fuelFile) : null

mkdirSync(join(docs, '.vitepress/data'), { recursive: true })
writeFileSync(
  join(docs, '.vitepress/data/data.json'),
  JSON.stringify({ names, textures, barkTypes, recipes, barkBurnTicks }, null, 2),
)
console.log(`Synced ${barkTypes.length} bark types, ${recipes.length} recipes, ${Object.keys(textures).length} textures.`)
