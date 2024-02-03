<script lang="ts">
import { ref, reactive, toRefs, onMounted, defineComponent} from 'vue'
export default defineComponent({
  mounted() {
    this.$bus.on('my-click', e => {
      console.log(e);
    })
  },
  methods: {
    handleClick() {
      this.$bus.emit('my-click', '试试看')
    }
  }
})
</script>
<template>
  <div>我是F组件</div>
  <button @click="handleClick">点击F组件</button>
</template>

<style scoped lang="scss">
</style>
