<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
let isVisible = ref<boolean>(false)
const show = () => isVisible.value = true
const hide = () => isVisible.value = false
defineExpose({
  show,
  hide
})
</script>
<template>
  <div v-if="isVisible" class="v-load">Later, loading……</div>
</template>

<style scoped lang="scss">
.v-load {
  position: fixed;
  width: 50vw;
  height: 50vh;
  top: 50%;
  margin-top: -25vh;
  left: 50%;
  margin-left: -25%;
  background-color: #0f0f0f;
  color: #fff;
  text-align: center;
  line-height: 50vh;
  font-size: 30px;
}
</style>
