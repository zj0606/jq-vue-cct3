<script setup lang="ts">
import { shallowRef, defineAsyncComponent, type Component, computed, withDefaults } from 'vue'
interface Props {
  iconName: string,
  viewBox: string
}
const props = withDefaults(defineProps<Props>(), {
  iconName: '',
  viewBox: ''
})
// 动态获取异步组件集合

const modules = import.meta.glob('./svg/*.vue')
// 声明一个对象承载异步加载来的组件
// let comObj:Record<string, object> = {}
// for (const path in modules) {
//     // 获取组件文件的名称，这里以vue文件名称作为对象的key
//     const key:string = path.replace(/(.*\/)*([^.]+).vue/ig, "$2")
//     if (key === props.iconName) {
//       comObj[key] = defineAsyncComponent(() =>  
//         import(path)
//       )
//     }
    
// }
let Comp: Component = null
const item:Array<string, () => Component> = Object.entries(modules).find(item => item[0].includes(props.iconName))
if (item) {
  Comp = defineAsyncComponent(item[1])
}
// 所有动态加载的异步组件集合
const comp = shallowRef<Component>(Comp)

</script>
<template>
  <component :is="comp" class="svg-icon" :viewBox="viewBox" />
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
