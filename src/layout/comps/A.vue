<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, inject} from 'vue'
import Dialog from '@/layout/dialog/index.vue'
const disabled = ref<boolean>(false)
const handleClick = () => {
  disabled.value = !disabled.value
}
const colorRef = inject('colorKey')
console.log(colorRef);

</script>
<template>
  <div class="z-box">content A</div>
  <div class="z-content"></div>
  <button @click="handleClick">{{ disabled }}</button>
  <teleport :disabled="disabled" to="body">
    <Dialog />
  </teleport>
</template>

<style scoped lang="scss">
@include b(box) {
  color: red;
}
@include b(content) {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: v-bind(colorRef);
}
</style>
