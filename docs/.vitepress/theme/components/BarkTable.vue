<script setup lang="ts">
import { BARK, barkTypes, woodSet } from '../unstriplog'
import ItemSlot from './ItemSlot.vue'

const rows = barkTypes().map((type) => ({ ...type, blocks: woodSet(type.name) }))
</script>

<template>
  <table class="ul-bark-table">
    <thead>
      <tr>
        <th>Bark</th>
        <th>Dropped by</th>
        <th>Bark type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td><ItemSlot :id="BARK" :bark="row.name" label /></td>
        <td>
          <span class="blocks">
            <ItemSlot :id="row.blocks.log" />
            <ItemSlot v-if="row.blocks.wood" :id="row.blocks.wood" />
          </span>
        </td>
        <td><code>{{ row.name }}</code></td>
      </tr>
      <tr>
        <td><ItemSlot :id="BARK" label /></td>
        <td class="ul-muted">Modded logs with no entry of their own</td>
        <td class="ul-muted">none</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.ul-bark-table td {
  vertical-align: middle;
}

.blocks {
  display: inline-flex;
  gap: 4px;
}
</style>
