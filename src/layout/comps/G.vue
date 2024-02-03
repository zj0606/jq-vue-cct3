<script setup lang="ts">
import { onUnmounted } from 'vue';
import { ref, reactive, toRefs, onMounted, getCurrentInstance} from 'vue'
const current = getCurrentInstance()
const handleClick = () => {
  current?.proxy?.$bus.emit('my-g', 'd')
}
onMounted(() => {
  current?.proxy?.$bus.on('my-g', e => {
    console.log(e)
  })
})
onUnmounted(() => {
  current?.proxy?.$bus.all.clear()
})
</script>
<template>
  <div>我是GGGG组件</div>
  <button @click="handleClick">点我试试看</button>
</template>

<style scoped lang="scss">
</style>
