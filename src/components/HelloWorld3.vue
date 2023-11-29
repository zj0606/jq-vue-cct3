<script setup lang="ts">
import TestPage from '@/components/TestPage.vue';

import { provide, ref } from 'vue'
import type { InjectionKey } from 'vue'
import { key } from '@/configKeys'
const k = key as InjectionKey<string>
provide(k, 'bar')
const modal = ref<InstanceType<typeof TestPage> | null>(null)
const handleOpen = () => {
  modal.value?.open()
}
</script>

<template>
  <div class="greetings">
    <TestPage ref="modal" />
    <button @click="handleOpen">切换</button>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
