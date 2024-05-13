<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick, watch } from 'vue'
import { useTestStore } from '@/layout/store/index'
import { storeToRefs } from 'pinia'
import { pinia } from '@/main'
const test = useTestStore()
console.log('test', test);
const { increase, queryData, setEmp } = test

const { state, emp, getHobby, double } = storeToRefs(test)

const container = ref<HTMLDivElement>()
type List = {
  name: string,
  text: string
}
const list = reactive<List[]>([])
const handleClick = () => {
  list.push({
    name: 'xjj',
    text: '你最骚'
  })
  // await nextTick()
  console.log('---------');
  nextTick(() => {
    console.log(list)
    container.value!.scrollTop = 99999
  })
}
const handlePatch = () => {
  test.$patch({ // 批量修改 接收对象
    state: { count: 20 }
  })
  // test.$patch((state) => { // $patch 可以接受函数 参数为state可以判断做额外的操作
  //   console.log(state);
    
  // })
}
watch(pinia.state, (state) => {
  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('piniaState', JSON.stringify(state))
},
{ deep: true })
const handleState = () => {
  test.$state = {
    emp: '+++',
    state: { //  使用$state 要全量覆盖
      count: 18,
      hobby: 'jxx',
      user: {
        name: 'xjjj',
        age: 20
      }
    }
  }
}
const handleReset = () => {
  console.log( test.$reset());
  
}
test.$subscribe((arg, state) => {
  console.log(arg);
  // 只要数据方法变化就执行
})
test.$onAction((args) => {
  console.log(args, 'args');
  
})
</script>
<template>
  <div ref="container" style="height: 100px; width: 50px; overflow-y: auto;">
    list: {{ list.length }}
    <div v-for="(item, index) in list" :key="index">
      {{ item.text }}
    </div>
   </div>
  <button @click="handleClick">点击下</button>
  <button @click="increase">increase{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="state.count++">increase{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="handlePatch">$patch{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="handleState">$state{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="queryData">queryData</button>
  <button @click="setEmp('jjj')">{{ emp }}</button>
  <button @click="handleReset">reset</button>
</template>

<style scoped lang="scss">
</style>
