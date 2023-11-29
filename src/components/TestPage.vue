<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import { key } from '@/configKeys'
const fo = inject<string>(key, 'bar')
const el = ref<HTMLInputElement | null>(null)
onMounted(() => {
  el.value?.focus()
})
const isContentShown = ref(false)
const open = () => {
  isContentShown.value = !isContentShown.value
}
defineExpose({
  open
})
</script>
<template>
  <div class="item">
    {{ fo }}  {{ isContentShown }}
  </div>
  <input ref="el" />
</template>

<style scoped>

</style>
