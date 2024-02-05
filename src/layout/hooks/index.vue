<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, useAttrs, useSlots} from 'vue'
import useBase64 from './index.ts'
const attrs = useAttrs()
const slots = useSlots()
console.log(attrs, slots);
useBase64({ el: '#img' }).then(res => {
  console.log(res.baseUrl)
})
</script>
<template>
  <div>
    <!-- <slot /> -->
    <img id="img" src="@/layout/hooks/images/bg_home.jpg" alt="图片" />
  </div>
</template>

<style scoped lang="scss">
img {
  width:200px;
  height: 200px;
}
</style>
