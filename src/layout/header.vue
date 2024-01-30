<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import { axios } from '@/layout/server/axios'
// 无ts
// const props = defineProps({
//   title: {
//     type: String,
//     default: '呵呵呵'
//   }
// })
// 有ts 并且设置默认值
withDefaults(defineProps<{
  title: string,
  age: number
}>(), { age: 20})
const ipt = ref<string>('')
// const emit = defineEmits(['my-click'])
const emit = defineEmits<{
  (e: 'my-click', value: ipt.value): void
}>()
const handleChange = () => {
  emit('my-click', ipt.value)
}
// const open = () => {
//   console.log('open001');
// }
defineExpose({
  name: 'child',
  open: ()=> {}
})
interface Data {
  data: {
    name: string,
    age: number,
    hobby: string
  }
}
const { data } = await axios.get<Data>('./data.json')
</script>
<template>
  <div class="z-header">
    header{{ title }}
    age: {{ data.age }}
    name: {{ data.name }}
    hobby: {{ data.hobby }}
    <input v-model="ipt" />
    <button @click="handleChange">plus</button>
  </div>
</template>

<style scoped lang="scss">
@include b(header) {
  height: 50px;
  background: {
    color: #f5f5f5;
  }
}
</style>
