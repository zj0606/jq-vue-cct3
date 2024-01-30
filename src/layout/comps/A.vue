<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import Dialog from '@/layout/dialog/index.vue'
const disabled = ref<boolean>(false)
const handleClick = () => {
  disabled.value = !disabled.value
}
</script>
<template>
  <div class="z-box">content A</div>
  <button @click="handleClick">{{ disabled }}</button>
  <teleport :disabled="disabled" to="body">
    <Dialog />
  </teleport>
</template>

<style scoped lang="scss">
@include b(box) {
  color: red;
}
</style>
