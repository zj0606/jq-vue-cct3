<script setup lang="ts">
import type { Directive } from 'vue';
import { onUnmounted } from 'vue';
import { ref, reactive, toRefs, onMounted, getCurrentInstance} from 'vue'
const current = getCurrentInstance()
const handleClick = () => {
  current?.proxy?.$bus.emit('my-g', 'd')
}
onMounted(() => {
  current?.proxy?.$bus.on('my-g', e => {
    console.log(e)
  })
})
onUnmounted(() => {
  current?.proxy?.$bus.all.clear()
})
localStorage.setItem('my-permission', 'xiaojianjian-zj')
// mock 后端返回的权限值集
const permission = [
'xiaojianjian-zj:shop:edit',
'xiaojianjian-zj:shop:detail',
'xiaojianjian-zj:shop:cancel'
]
const userId = localStorage.getItem('my-permission')
// 权限应该是全局指令，为了验证暂时写局部指令
const vPermission:Directive<HTMLElement, string> = (el, bidding) => {
  // Directive<HTMLElement, string> 泛型HTMLElement, string 根据个人的实绩情况传参
  if (!permission.includes(`${userId}:${bidding.value}`)) {
    el.style.display = 'none'
  }
}
</script>
<template>
  <div>我是GGGG组件</div>
  <button @click="handleClick">点我试试看</button>
  <hr>
  <div class="btns">
    <button v-permission="'shop:edit'">编辑</button>
    <button v-permission="'shop:detail'">查看</button>
    <button v-permission="'shop:cancel'">取消</button>
  </div>
</template>

<style scoped lang="scss">
.btns>button{
  margin-right: 20px;
}
</style>
