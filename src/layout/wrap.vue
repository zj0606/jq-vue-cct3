<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, defineAsyncComponent} from 'vue'
const Header = defineAsyncComponent(() => import('./header.vue'))
// import Header from './header.vue'
import Skeleton from './skeleton.vue'
import Content from './content.vue'
const tilte = ref('我是头部')
const handleClick = (data: string) => {
  console.log(`我来自：${data}`);
}
const expose = ref<InstanceType<typeof Header>>()

console.log(expose.name);

</script>
<template>
  <div class="z-box">
    <Suspense>
      <template #default>
        <Header ref="expose" :age="18" :title="tilte" @my-click="handleClick"/>
      </template>
      <template #fallback>
        <Skeleton />
      </template>
    </Suspense>
    <Content />
  </div>
</template>

<style scoped lang="scss">
@include b(box) {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
}
</style>
