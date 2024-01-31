<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, shallowRef, markRaw, provide, readonly} from 'vue'
import A from './comps/A.vue'
import B from './comps/B.vue'
import C from './comps/C.vue'

const comps = reactive([{
    name: '组件A',
    comp: markRaw(A)
  },
  {
    name: '组件B',
    comp: markRaw(B)
  },
  {
    name: '组件C',
    comp: markRaw(C)
  }
])
const currentComp = shallowRef(A)
const handleClick = (item: any) => {
  currentComp.value = item.comp
}
const colorRef = ref<string>('red')
provide('colorKey', readonly(colorRef))
</script>
<template>
  <div class="z-content">
    <input type="radio" v-model="colorRef" value="red" name="radio" />红
    <input type="radio" v-model="colorRef" value="yellow" name="radio" />黄
    <input type="radio" v-model="colorRef" value="pink" name="radio" />粉
    <button v-for="(item, index) in comps" @click="handleClick(item)" :key="index">{{ item.name }}<br></button>
    <!-- <component :is="currentComp" /> -->
    <Suspense>
      <!-- 主要内容 -->
      <component :is="currentComp" />
      <!-- 加载中状态 -->
      <template #fallback>
        正在加载...
      </template>
    </Suspense>
    <!-- <div class="z-content__inner" v-for="item in 100" :key="item">{{item}}</div> -->
  </div>
</template>

<style scoped lang="scss">
@include b(content) {
  flex: 1;
  overflow: auto;
  @include e(inner) {
    height: 20px;
    line-height: 20px;
    border: 1px solid #eee;
  }
}
</style>
