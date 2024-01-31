<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import Bus from '@/layout/bus'

// const emit = defineEmits(['on-click'])
let flag = false
const handleClick = () => {
  flag = !flag
  // emit('on-click', flag)
  Bus.emit('click-on', flag)
}
</script>
<template>
  <div class="z-dbox">
    我是D组件
    <button @click="handleClick">点击D组件</button>
  </div>
</template>

<style scoped lang="scss">
@include b(dbox) {
  background-color: aqua;
  color: #000;
  font-size: 20px;
}
</style>
