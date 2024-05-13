
<script lang="ts">
import { defineComponent } from 'vue'
import { ref, reactive, toRefs, onMounted, nextTick} from 'vue'
import { useTestStore } from '@/layout/store/index'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'OptionsCompIndex',
  setup(props, ctx) {
      console.log(props, ctx);
      const test = useTestStore()
      console.log('test', test)
      const { increase, queryData, setEmp } = test
      const { state, emp, getHobby, double } = storeToRefs(test)
      const container = ref<HTMLDivElement>()
      type List = {
        name: string,
        text: string
      }
      const list = reactive<List[]>([])

      return { increase, queryData, setEmp, state, emp, getHobby, double, test, container, list }
  },
  created() {
      
  },
  mounted() {
    this.test.$subscribe((arg, state) => {
      console.log(arg);
      // 只要数据方法变化就执行
    })
    this.test.$onAction((args) => {
      console.log(args, 'args');
      
    })
  },
  methods: {
    handleClick() {
      this.list.push({
        name: 'xjj',
        text: '你最骚'
      })
      // await nextTick()
      console.log('---------');
      nextTick(() => {
        console.log(this.list)
        this.container!.scrollTop = 99999
      })
    },
    handlePatch() {
      this.test.$patch({ // 批量修改 接收对象
        state: { count: 20 }
      })
      // test.$patch((state) => { // $patch 可以接受函数 参数为state可以判断做额外的操作
      //   console.log(state);
        
      // })
    },
    handleState() {
      this.test.$state = {
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
    },
    handleReset() {
      this.test.$reset()
    }
  }
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
