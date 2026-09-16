<script setup lang="ts">
import { computed, ref } from 'vue'
import { BARK, barkTypes, itemName, woodSet } from '../unstriplog'
import ItemSlot from './ItemSlot.vue'

const props = withDefaults(
  defineProps<{
    /** Bark type to show, or `default` for a log with no bark type of its own. */
    bark?: string
    /** Lets the reader switch between wood types. */
    picker?: boolean
    mode?: 'both' | 'strip' | 'unstrip'
  }>(),
  { bark: 'oak', picker: false, mode: 'both' },
)

const types = barkTypes()
const selected = ref(props.bark)
const typed = computed(() => selected.value !== 'default')
const blocks = computed(() => (typed.value ? woodSet(selected.value) : null))

interface Slot {
  id: string | null
  bark?: string | null
  name?: string
  text?: string
}

const log = computed<Slot>(() =>
  blocks.value ? { id: blocks.value.log } : { id: null, name: 'Any other strippable log', text: '?' },
)
const stripped = computed<Slot>(() =>
  blocks.value
    ? { id: blocks.value.strippedLog }
    : { id: null, name: 'Its stripped version', text: '?' },
)
const bark = computed<Slot>(() => ({ id: BARK, bark: typed.value ? selected.value : null }))
const barkName = computed(() => itemName(BARK, typed.value ? selected.value : null))
</script>

<template>
  <div class="ul-flow">
    <div v-if="picker" class="picker" role="radiogroup" aria-label="Wood type">
      <button
        v-for="type in types"
        :key="type.name"
        role="radio"
        :aria-checked="selected === type.name"
        :class="{ active: selected === type.name }"
        :title="type.label"
        @click="selected = type.name"
      >
        <ItemSlot :id="BARK" :bark="type.name" />
      </button>
      <button
        role="radio"
        :aria-checked="selected === 'default'"
        :class="{ active: selected === 'default' }"
        title="Modded logs"
        @click="selected = 'default'"
      >
        <ItemSlot :id="BARK" name="Bark (modded logs)" />
      </button>
    </div>

    <div v-if="mode !== 'unstrip'" class="row strip">
      <span class="tag">Strip</span>
      <ItemSlot v-bind="log" />
      <span class="op">+</span>
      <ItemSlot id="minecraft:iron_axe" name="Any axe" />
      <span class="arrow">➜</span>
      <ItemSlot v-bind="stripped" />
      <span class="op">+</span>
      <ItemSlot v-bind="bark" />
      <span class="caption">Drops <strong>{{ barkName }}</strong></span>
    </div>

    <div v-if="mode !== 'strip'" class="row unstrip">
      <span class="tag">Unstrip</span>
      <ItemSlot v-bind="stripped" />
      <span class="op">+</span>
      <ItemSlot v-bind="bark" />
      <span class="arrow">➜</span>
      <ItemSlot v-bind="log" />
      <span class="caption">Uses one <strong>{{ barkName }}</strong></span>
    </div>

    <p v-if="blocks?.wood" class="ul-muted wood">
      Works the same on {{ itemName(blocks.wood) }} ⇄ {{ itemName(blocks.strippedWood!) }}.
    </p>
  </div>
</template>

<style scoped>
.ul-flow {
  margin: 16px 0;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.picker {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.picker button {
  padding: 3px;
  border: 2px solid transparent;
  border-radius: 6px;
  line-height: 0;
  transition: border-color 0.15s;
}

.picker button:hover {
  border-color: var(--vp-c-divider);
}

.picker button.active {
  border-color: var(--vp-c-brand-1);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

.tag {
  box-sizing: border-box;
  width: 84px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.strip .tag {
  color: var(--ul-strip);
  border: 1px solid var(--ul-strip);
}

.unstrip .tag {
  color: var(--ul-unstrip);
  border: 1px solid var(--ul-unstrip);
}

.op,
.arrow {
  font-size: 20px;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.caption {
  font-size: 0.875em;
  color: var(--vp-c-text-2);
}

.wood {
  margin: 6px 0 0;
}
</style>
