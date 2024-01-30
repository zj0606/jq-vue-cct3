<script setup lang="ts">
import Menu from '@/layout/menu.vue'
import Wrap from '@/layout/wrap.vue'
</script>

<template>
  <div class="z-box">
    <Menu />
    <Wrap />
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
