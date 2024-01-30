<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

</script>
<template>
  <div class="z-dialog">
    我是一个弹窗
  </div>
</template>

<style scoped lang="scss">
@include b(dialog) {
  width: 400px;
  height: 400px;
  background-color: #f5f5f5;
  position: fixed;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
  margin-left: -200px;
  margin-top: -200px;
}
</style>
