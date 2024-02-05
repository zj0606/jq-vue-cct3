<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import type { Directive } from 'vue'
const imagesList:Record<string, {default: string}> = import.meta.glob('./images/*', { eager: true })
const arr = Object.values(imagesList).map(v => v.default)
let vLazy:Directive<HTMLImageElement, string> = async (el, bidding) => {
  console.log(el);
  const def = await import('@/assets/logo.svg')
  el.src = def.default
  const intersectionObserver  = new IntersectionObserver((entries) => {
    console.log(entries);
    if (entries[0].intersectionRatio > 0) {
      setTimeout(() => {
        el.src = bidding.value
        intersectionObserver.unobserve(el)
      }, 2000);
    }
  })
  // 开始监听
  intersectionObserver.observe(el)
}

</script>
<template>
  <div>
    <div>
      <img v-lazy="item" v-for="(item, index) in arr" :src="item" :key="index" alt="图片" />
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100vw;
}
</style>
