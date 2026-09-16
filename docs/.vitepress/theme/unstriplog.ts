// @ts-ignore
import raw from '../data/data.json'

export interface BarkType {
  name: string
  label: string
  texture: string
}

export interface Recipe {
  id: string
  type: string
  result: { id: string; count: number }
  pattern?: string[]
  key?: Record<string, string>
  ingredients?: string[]
  ingredient?: string
  cookingTime?: number
}

export const data = raw as unknown as {
  names: Record<string, string>
  textures: Record<string, string>
  barkTypes: BarkType[]
  recipes: Recipe[]
  barkBurnTicks: number | null
}

export const BARK = 'unstriplog:bark'

/** Vanilla wood sets in creative-menu order; the mod has one bark type for each. */
const WOOD_ORDER = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'mangrove', 'cherry', 'pale_oak', 'crimson', 'warped', 'bamboo']

export function barkTypes(): BarkType[] {
  const rank = (name: string) => {
    const index = WOOD_ORDER.indexOf(name)
    return index === -1 ? WOOD_ORDER.length : index
  }
  return [...data.barkTypes].sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name))
}

export interface WoodSet {
  log: string
  strippedLog: string
  /** Bamboo has no wood block. */
  wood: string | null
  strippedWood: string | null
}

/** The vanilla blocks that drop a bark type: logs and wood, stems and hyphae, or the bamboo block. */
export function woodSet(barkType: string): WoodSet {
  if (barkType === 'bamboo') {
    return { log: 'minecraft:bamboo_block', strippedLog: 'minecraft:stripped_bamboo_block', wood: null, strippedWood: null }
  }
  const nether = barkType === 'crimson' || barkType === 'warped'
  const [log, wood] = nether ? ['stem', 'hyphae'] : ['log', 'wood']
  return {
    log: `minecraft:${barkType}_${log}`,
    strippedLog: `minecraft:stripped_${barkType}_${log}`,
    wood: `minecraft:${barkType}_${wood}`,
    strippedWood: `minecraft:stripped_${barkType}_${wood}`,
  }
}

/** Mod items use their in-game name (typed bark by its type); vanilla ids are turned into readable names. */
export function itemName(id: string, bark?: string | null): string {
  if (bark && id === BARK) return data.names[`unstriplog:${bark}_bark`] ?? `${titleCase(bark)} Bark`
  if (data.names[id]) return data.names[id]
  return titleCase(id.replace(/^#/, '').split(':').pop() ?? id)
}

function titleCase(path: string): string {
  return path
    .split('_') // @ts-ignore
    .map((word) => (['of', 'the'].includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

/** Hosted renders of vanilla items and blocks, one PNG per id. Mojang's textures are not bundled here. */
const VANILLA_ICONS = 'https://storage.googleapis.com/coolerpromc/textures'

/**
 * Where to load an item's icon from. Bark uses the textures copied from the mod (a site path),
 * picked by bark type like the in-game renderer does; vanilla items use the hosted renders.
 */
export function itemIcon(id: string, bark?: string | null): { src: string; local: boolean } | null {
  const local = bark && id === BARK ? data.textures[`unstriplog:${bark}_bark`] : data.textures[id]
  if (local) return { src: local, local: true }
  // @ts-ignore
  const [namespace, path] = id.includes(':') ? id.split(':') : ['minecraft', id]
  if (namespace !== 'minecraft') return null
  return { src: `${VANILLA_ICONS}/${namespace}/${path}.png`, local: false }
}

export function seconds(ticks: number): string {
  const value = ticks / 20
  // @ts-ignore
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}
