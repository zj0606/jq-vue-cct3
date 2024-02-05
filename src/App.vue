<script setup lang="ts">
// import Menu from '@/layout/menu.vue'
// import Wrap from '@/layout/wrap.vue'
// 自定义指令实现懒加载
// import Box from '@/layout/lazyLoad/index.vue'
// 自定义hooks
import Box from '@/layout/hooks/index.vue'
</script>

<template>
  <div class="z-box">
    <Box :title="22" :width="300" :height="300">
      <template v-slot:default>
        <span>哈哈</span>
      </template> 
      <template v-slot:name>
        你好
      </template>
    </Box>
    <!-- <Menu />
    <Wrap /> -->
  </div>

</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
@include b(box) {
  display: flex;
}
</style>
