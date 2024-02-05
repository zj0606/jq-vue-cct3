<script setup lang="ts">
// import Menu from '@/layout/menu.vue'
// import Wrap from '@/layout/wrap.vue'
import Box from '@/layout/lazyLoad/index.vue'
</script>

<template>
  <div class="z-box">
    <Box />
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
