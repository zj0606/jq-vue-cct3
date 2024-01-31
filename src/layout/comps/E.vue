<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import Bus from '@/layout/bus'

// defineProps<{
//   flag: boolean
// }>()
const flag = ref(false)
Bus.on('click-on', (params:boolean) => {
  flag.value = params
})
</script>
<template>
  <div class="z-dbox">
    我是E组件
    {{ flag }}
  </div>
</template>

<style scoped lang="scss">
@include b(dbox) {
  background-color: pink;
  color: #000;
  font-size: 20px;
}
</style>
