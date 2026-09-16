<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { BARK, barkTypes } from '../unstriplog'
import ItemSlot from './ItemSlot.vue'

const types = barkTypes()
const ID = /^[a-z0-9_.-]+:[a-z0-9_./-]+$/

/** An item to drop or to unstrip with. `bark` is a bark type name, `custom` for a new one, or empty for none. */
interface ItemForm {
  id: string
  bark: string
  customName: string
  customTexture: string
}

const form = reactive({
  base: 'mymod:maple_log',
  stripped: 'mymod:stripped_maple_log',
  drop: { id: BARK, bark: 'custom', customName: 'maple', customTexture: 'mymod:textures/item/maple_bark.png' } as ItemForm,
  separate: false,
  unstrip: { id: BARK, bark: '', customName: '', customTexture: '' } as ItemForm,
})

function barkComponent(item: ItemForm) {
  if (item.id !== BARK || !item.bark) return null
  if (item.bark === 'custom') return { name: item.customName, texture: item.customTexture }
  const type = types.find((t) => t.name === item.bark)
  return type ? { name: type.name, texture: type.texture } : null
}

function itemJson(item: ItemForm) {
  const component = barkComponent(item)
  return component ? { id: item.id, components: { 'unstriplog:bark_type': component } } : { id: item.id }
}

const json = computed(() => {
  const entry: Record<string, unknown> = { base: form.base, stripped: form.stripped, drop: itemJson(form.drop) }
  if (form.separate) entry.unstrip_item = itemJson(form.unstrip)
  return JSON.stringify(entry, null, 2)
})

const problems = computed(() => {
  const list: string[] = []
  const check = (label: string, value: string) => {
    if (!ID.test(value)) list.push(`${label} should be an id like namespace:path.`)
  }
  check('Log', form.base)
  check('Stripped log', form.stripped)
  check('Drop item', form.drop.id)
  if (form.separate) check('Unstrip item', form.unstrip.id)
  for (const item of form.separate ? [form.drop, form.unstrip] : [form.drop]) {
    if (barkComponent(item) && item.bark === 'custom') {
      if (!/^[a-z0-9_]+$/.test(item.customName)) list.push('A bark type name should be lowercase letters, digits and underscores.')
      if (!ID.test(item.customTexture) || !item.customTexture.endsWith('.png')) {
        list.push('A bark texture should be a full path like mymod:textures/item/maple_bark.png.')
      }
    }
  }
  if (form.base && form.base === form.stripped) list.push('The log and its stripped version must be different blocks.')
  return [...new Set(list)]
})

const preview = (item: ItemForm) => {
  const component = barkComponent(item)
  return { id: item.id, bark: component && types.some((t) => t.name === component.name) ? component.name : null }
}

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(json.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="ul-builder">
    <div class="fields">
      <label>
        <span>Log (<code>base</code>)</span>
        <input v-model.trim="form.base" spellcheck="false" />
      </label>
      <label>
        <span>Stripped log (<code>stripped</code>)</span>
        <input v-model.trim="form.stripped" spellcheck="false" />
      </label>

      <fieldset v-for="(item, key) in form.separate ? { drop: form.drop, unstrip_item: form.unstrip } : { drop: form.drop }" :key="key">
        <legend>
          <ItemSlot v-bind="preview(item)" />
          <code>{{ key }}</code>
        </legend>
        <label>
          <span>Item id</span>
          <input v-model.trim="item.id" spellcheck="false" />
        </label>
        <label v-if="item.id === BARK">
          <span>Bark type</span>
          <select v-model="item.bark">
            <option value="">None (plain bark)</option>
            <option v-for="type in types" :key="type.name" :value="type.name">{{ type.label }}</option>
            <option value="custom">New bark type…</option>
          </select>
        </label>
        <template v-if="item.id === BARK && item.bark === 'custom'">
          <label>
            <span>Bark type name</span>
            <input v-model.trim="item.customName" spellcheck="false" />
          </label>
          <label>
            <span>Texture</span>
            <input v-model.trim="item.customTexture" spellcheck="false" />
          </label>
        </template>
      </fieldset>

      <label class="check">
        <input v-model="form.separate" type="checkbox" />
        Unstrip with a different item than the drop
      </label>
    </div>

    <div class="output">
      <div class="head">
        <span>Entry for <code>unstrip-detailed.json</code></span>
        <button :disabled="problems.length > 0" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
      </div>
      <pre><code>{{ json }}</code></pre>
      <ul v-if="problems.length" class="problems">
        <li v-for="problem in problems" :key="problem">{{ problem }}</li>
      </ul>
      <p v-else class="ul-muted">Paste it inside the top-level <code>[ ]</code>, with a comma between entries.</p>
    </div>
  </div>
</template>

<style scoped>
.ul-builder {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  margin: 16px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

@media (max-width: 720px) {
  .ul-builder {
    grid-template-columns: minmax(0, 1fr);
  }
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875em;
  font-weight: 500;
}

label code {
  font-size: 0.9em;
}

label.check {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

input:not([type='checkbox']),
select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}

select {
  font-family: inherit;
  appearance: auto;
}

input:focus,
select:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

fieldset {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 8px 12px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

legend {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 6px;
}

.output {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.875em;
  font-weight: 500;
}

.head button {
  padding: 4px 12px;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-neutral-inverse);
  font-size: 13px;
  font-weight: 600;
}

.head button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

pre {
  flex: 1;
  margin: 8px 0;
  padding: 12px;
  overflow-x: auto;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  font-size: 13px;
  line-height: 1.5;
}

pre code {
  padding: 0;
  background: none;
  font-size: inherit;
}

.problems {
  margin: 0;
  padding-left: 18px;
  color: var(--vp-c-danger-1);
  font-size: 0.875em;
}

.problems li {
  margin: 2px 0;
}
</style>
