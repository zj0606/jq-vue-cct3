
<script lang="ts">
import { defineComponent } from 'vue'
import { ref, reactive, toRefs, onMounted, nextTick} from 'vue'
import { useTestStore } from '@/layout/store/index'
import { storeToRefs, mapState, mapWritableState } from 'pinia'
export default defineComponent({
  name: 'OptionsCompIndex',
  setup(props, ctx) {
      console.log(props, ctx);
      const test = useTestStore()
      console.log('test', test)
      const { increase, queryData, setEmp } = test
      const { state, getHobby, double } = storeToRefs(test)
      const container = ref<HTMLDivElement>()
      type List = {
        name: string,
        text: string
      }
      const list = reactive<List[]>([])

      return { increase, queryData, setEmp, state, getHobby, double, test, container, list }
  },
  computed: {
    // 数组形式：使用和定义的状态一致
    // ...mapState(useTestStore, ['emp']),
    ...mapState(useTestStore, {
      // myEmp: 'emp',
      triple: store => store.state.count * 3,
      // 它可以访问 `this`，但它没有标注类型...
      magicValue(store) {
        return this.triple + this.myEmp + store.state.hobby
      },
    }),
    // 可以访问组件中的 this.emp，并允许设置它。
    // this.emp = 'xx'
    // 与从 store.emp 中读取的数据相同
    ...mapWritableState(useTestStore, ['emp']),
    // 与上述相同，但将其注册为 this.myEmp
    // mapWritableState 不可以接受函数
    ...mapWritableState(useTestStore, {
      myEmp: 'emp'
    })
  },  
  created() {
      
  },
  mounted() {
    this.test.$subscribe((arg, state) => {
      console.log(arg, state);
      // 只要数据方法变化就执行
    },
    // 默认情况下 store subscription 被绑定到当前组件上（store 在setup()内），这意味着当组件被卸载时 同步被删除
    // 如果想让store subscription 从组建中分离出来，如果配置option；{ detached: true }
    // 此订阅器即便在组件卸载之后仍会被保留
    { detached: true }
  )
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
   <span>triple:{{ triple }}, {{ magicValue }}</span>
  <button @click="handleClick">点击下</button>
  <button @click="increase">increase{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="state.count++">increase{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="handlePatch">$patch{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="handleState">$state{{ state.count }}-{{ double }}--{{ getHobby }}</button>
  <button @click="queryData">queryData</button>
  <button @click="setEmp('jjj')">{{ emp }}--myEmp:{{ myEmp }}</button>
  <button @click="handleReset">reset</button>
</template>

<style scoped lang="scss">
</style>
