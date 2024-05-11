<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick} from 'vue'
import { useTestStore } from '@/layout/store/index'
import { storeToRefs, mapActions } from 'pinia'
const test = useTestStore()
  console.log('test', test);

const { count, double, getHobby } = storeToRefs(test)
const { increase, queryData } = test

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
    count: 20
  })
  // test.$patch((state) => { // $patch 可以接受函数 参数为state可以判断做额外的操作
  //   console.log(state);
    
  // })
}
const handleState = () => {
  test.$state = { //  使用$state 要全量覆盖
    count: 30,
    hobby: 'jxx',
    user: {
      name: 'xjjj',
      age: 20
    }
  }
}
</script>
<template>
  <div ref="container" style="height: 100px; width: 50px; overflow-y: auto;">
    list: {{ list.length }}
    <div v-for="(item, index) in list" :key="index">
      {{ item.text }}
    </div>
   </div>
  <button @click="handleClick">点击下</button>
  <button @click="increase">increase{{ count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="count++">increase{{ count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="handlePatch">$patch{{ count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="handleState">$state{{ count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="queryData">queryData</button>
</template>

<style scoped lang="scss">
</style>
