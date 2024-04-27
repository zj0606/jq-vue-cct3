<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, useAttrs, useSlots} from 'vue'
import useBase64 from './index.ts'
const attrs = useAttrs()
const slots = useSlots()
console.log(attrs, slots);
useBase64({ el: '#img' }).then(res => {
  console.log(res.baseUrl)
})
// 自定义hook 使用方式
// import userResize from 'v-resize-xjj'
// onMounted(() => {
//   userResize(document.querySelector('#img-box') as HTMLElement, (e:any) => {
//     console.log(e)
//   })
// })
// 自定义指令的方式
const cal = (e: any) => {
  console.log(e)
}
</script>
<template>
  <div v-resize="cal" id="img-box">
    <!-- <slot /> -->
    <img id="img" src="@/layout/hooks/images/bg_home.jpg" alt="图片" />
  </div>
</template>

<style scoped lang="scss">
img {
  width:200px;
  height: 200px;
}
#img-box {
  resize: both;
  overflow: auto;
}
</style>
