<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, inject} from 'vue'
import type { Ref } from 'vue'
import D from './D.vue'
import E from './E.vue'
const colorRef = inject<Ref<string>>('colorKey', ref('yellow'))
const handleChangeColor = () => {
  colorRef!.value = 'red'
}
let flag = ref<boolean>(false)
const changeFlag = (params: boolean) => {
  flag.value = params
}
</script>
<template>
  <div class="z-box">content cC</div>
  <button @click="handleChangeColor">变为红色</button>
  <div class="z-content"></div>
  <D @on-click="changeFlag" />
  <E :flag="flag"/>
</template>

<style scoped lang="scss">
@include b(box) {
  color: red;
}
@include b(content) {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: v-bind(colorRef);
}
</style>
