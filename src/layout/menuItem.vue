<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
interface DataInfo {
  text: string,
  checked: boolean,
  children?: DataInfo[]
}
defineProps<{
  data?: DataInfo[]
}>()
</script>
<script lang="ts">
export default {
  name: 'xiaoZhang'
}
</script>
<template>
  <div class="z-menuItem" v-for="(item, index) in data" :key="index">
    <input class="z-menuItem__inner" type="checkbox" :checked="item.checked" />
    {{ item.text }}
    <xiaoZhang v-if="item?.children?.length" :data="item.children" />
  </div>
</template>

<style scoped lang="scss">
$border: 1px;
@include b(menuItem){
  background-color: #f5f5f5;
  @include e(inner) {
    border-bottom: $border solid #eee;
  }
}
</style>
