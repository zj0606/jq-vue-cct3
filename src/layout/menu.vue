<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import MenuItem from './menuItem.vue';
interface DataInfo {
  text: string,
  checked: boolean,
  children?: DataInfo[]
}
const data = reactive<DataInfo[]>([{
  text: '小小',
  checked: false,
  children: [{
    text: '啊哈',
    checked: true
  }]
}, {
  text: '小张',
  checked: true
}])
</script>
<template>
  <div class="z-menu">
    <MenuItem :data="data" />
  </div>
</template>

<style scoped lang="scss">
$border: 1px;
@include b(menu){
  width: 200px;
  border-right: $border solid #f5f5f5;
  @include bfc;
}
</style>
