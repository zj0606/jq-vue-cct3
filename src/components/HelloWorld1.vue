<script setup lang="ts">
// defineProps({
//   msg: { required: true, type: String},
//   num: Number
// })

// defineProps<{
//   msg: string,
//   num?: number
// }>()

// interface props {
//   msg: string,
//   num: number
// }
// defineProps<props>()

import { Props } from '@/interface'
// defineProps<Props>()
withDefaults(defineProps<Props>(), {
  name: 'happy',
  hobby: 'basketball'
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ num }} {{ name }} {{ hobby }}</h1>
    <h1 class="green">{{ msg }}</h1>
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
