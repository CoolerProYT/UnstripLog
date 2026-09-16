import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import BarkTable from './components/BarkTable.vue'
import EntryBuilder from './components/EntryBuilder.vue'
import ItemSlot from './components/ItemSlot.vue'
import RecipeCard from './components/RecipeCard.vue'
import StripFlow from './components/StripFlow.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BarkTable', BarkTable)
    app.component('EntryBuilder', EntryBuilder)
    app.component('ItemSlot', ItemSlot)
    app.component('RecipeCard', RecipeCard)
    app.component('StripFlow', StripFlow)
  },
} satisfies Theme
