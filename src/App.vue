<script lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      titre: 'Le titre'
    }
  },
})
</script>

<template>
  <h1>{{ titre }}</h1>
  <RouterView />
</template>
