<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, inject} from 'vue'
import Dialog from '@/layout/dialog/index.vue'
const disabled = ref<boolean>(false)
const handleClick = () => {
  disabled.value = !disabled.value
}
const colorRef = inject('colorKey')
console.log(colorRef);
const isShow = ref<boolean>(true)
const text = ref<string>('123')
</script>
<template>
  <div class="z-box">content A</div>
  <div class="z-content"></div>
  <button @click="handleClick">{{ disabled }}</button>

  <button @click="isShow = !isShow">关闭弹窗:{{ isShow }}:{{ text }}</button>
  <teleport :disabled="disabled" to="body">
    <Dialog v-model="isShow" v-model:textValue.capitalize="text" />
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
