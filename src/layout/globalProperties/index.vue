<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, getCurrentInstance} from 'vue'
const instance = getCurrentInstance()
// const $een = instance?.appContext.config.globalProperties.$enn
const $een = instance?.proxy?.$enn
// console.log($een);
setTimeout(() => {
  instance?.proxy?.foo.show()
}, 5000);
// console.log(instance);
const show = () => {
  instance?.proxy?.$vloading.show()
}
const hide = () => {
  instance?.proxy?.$vloading.hide()
}
</script>
<template>
  <div>{{ $een }} 22</div>
  <button @click="show">show</button>
  <button @click="hide">hide</button>
</template>

<style scoped lang="scss">
</style>
