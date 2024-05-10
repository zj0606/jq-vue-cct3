<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick} from 'vue'
const box = ref<HTMLDivElement>()
const list = []
const handleClick = async () => {
  list.push({
    name: 'xjj',
    text: '你最骚'
  })
  await nextTick()
  console.log('---------');
  box.value!.scrollTop = 99999
}
</script>
<template>
  <div ref="box" style="height: 100px; overflow-y: auto;">
    <div v-for="(item, index) in list" :key="index">
      {{ item.text }}
    </div>
   </div>
  <button @click="handleClick">点击下</button>
</template>

<style scoped lang="scss">
</style>
