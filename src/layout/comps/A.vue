<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, inject,type Directive,type DirectiveBinding} from 'vue'
import Dialog from '@/layout/dialog/index.vue'
import { setgroups } from 'process';
const disabled = ref<boolean>(false)
const handleClick = () => {
  disabled.value = !disabled.value
}
const colorRef = inject('colorKey')
console.log(colorRef);
const isShow = ref<boolean>(true)
const text = ref<string>('123')
const flag = ref<string>('指令')
type DirBIdding = {
  backgroud: string
}
// 自定义指令一定以v开头
// 定义一个局部指令
const vMove:Directive = {
  created(el, bidding, vnode, prevNode){
    console.log('====> created');
  },
  beforeMount() {
    console.log('====> beforeMount');
  },
  mounted(el, bidding:DirectiveBinding<DirBIdding>, vnode, prevNode) {
    el.style.backgroundColor = bidding.value.backgroud
    console.log('====> mounted');
  },
  beforeUpdate() {
    console.log('====> beforeUpdate');
  },
  updated() {
    console.log('====> updated');
  },
  beforeUnmount() {
    console.log('====> beforeUnmount');
  },
  unmounted() {
    console.log('====> unmounted');
  }
}
// 如果只需要在mounted 和updated 做同样的事情可以使用简写的函数形式
const vFocus:Directive = (el, bidding, vnode, prevNode) => {
  el.focus();
}
const vMouseMove:Directive<any, void> = (el:HTMLDivElement, bidding:DirectiveBinding) => {
  const divEle:HTMLDivElement = el as HTMLDivElement
  const mouseDown = (e:MouseEvent) => {
    let x = e.clientX - el.offsetLeft
    let y = e.clientY - el.offsetTop
    const mouseMove = (e:MouseEvent) => {
      divEle.style.left =  e.clientX - x + 'px'
      divEle.style.top =  e.clientY - y + 'px'
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', mouseMove)
    })
  }
  divEle.addEventListener('mousedown', mouseDown)
}
</script>
<template>
  <div class="z-box">content A</div>
  <div class="z-content"></div>
  <button @click="handleClick">{{ disabled }}</button>
  <br>
  <input type="text" v-model="flag" v-focus>
  <button @click="isShow = !isShow">关闭弹窗:{{ isShow }}:{{ text }}</button>
  <teleport :disabled="disabled" to="body">
    <Dialog v-mouse-move v-move:arr.alias="{backgroud: 'red', flag: flag}" v-model="isShow" v-model:textValue.capitalize="text" />
  </teleport>
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
