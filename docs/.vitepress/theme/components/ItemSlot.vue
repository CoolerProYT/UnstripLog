<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { itemIcon, itemName } from '../unstriplog'

const props = withDefaults(
  defineProps<{
    id?: string | null
    /** Bark type stored in the item's `unstriplog:bark_type` component. */
    bark?: string | null
    count?: number
    label?: boolean
    /** Replaces the item name, for slots that stand for a group of items. */
    name?: string | null
    /** Shown in the slot instead of an icon. */
    text?: string | null
  }>(),
  { id: null, bark: null, count: 1, label: false, name: null, text: null },
)

const displayName = computed(() => props.name ?? (props.id ? itemName(props.id, props.bark) : ''))
const icon = computed(() => (props.id && !props.text ? itemIcon(props.id, props.bark) : null))
const src = computed(() => (icon.value ? (icon.value.local ? withBase(icon.value.src) : icon.value.src) : null))

// Falls back to initials when an item has no icon or the hosted icon fails to load.
const failed = ref(false)
watch(src, () => (failed.value = false))
const initials = computed(
  () =>
    props.text ??
    displayName.value
      .split(' ')
      .filter((word) => /^[A-Z]/.test(word))
      .slice(0, 2)
      .map((word) => word[0])
      .join(''),
)
</script>

<template>
  <span class="ul-item" :class="{ 'with-label': label }">
    <span class="ul-slot" :title="displayName" :aria-label="displayName" role="img">
      <img v-if="src && !failed" class="pixelated" :src="src" alt="" loading="lazy" @error="failed = true" />
      <span v-else-if="id || text" class="ul-initials">{{ initials }}</span>
      <span v-if="count > 1" class="ul-count">{{ count }}</span>
    </span>
    <span v-if="label && displayName" class="ul-label">{{ displayName }}</span>
  </span>
</template>

<style scoped>
.ul-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  vertical-align: middle;
}

.ul-slot {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  background: var(--ul-slot-bg);
  border: 2px solid;
  border-color: var(--ul-slot-dark) var(--ul-slot-light) var(--ul-slot-light) var(--ul-slot-dark);
}

.ul-slot img {
  width: 32px;
  height: 32px;
  margin: 0;
}

.ul-initials {
  font: 600 12px/1 var(--vp-font-family-mono);
  color: #fff;
  text-shadow: 1px 1px 0 #3f3f3f;
}

.ul-count {
  position: absolute;
  right: 1px;
  bottom: -1px;
  font: 700 12px/1 var(--vp-font-family-mono);
  color: #fff;
  text-shadow: 1px 1px 0 #3f3f3f;
}

.ul-label {
  font-weight: 500;
}
</style>
