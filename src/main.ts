import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import userResize from 'v-resize-xjj'
import loadInstall from './layout/loading'

// 全局事件总线
import mitt from "mitt";
const bus = mitt()
export const app = createApp(App)

import { MyUse } from './layout/myuse'
// 使用函数式 store 时需要重置$reset 方法
// import StoreReset from '@/layout/store/storeReset'
export const pinia = createPinia()
// pinia.use(StoreReset)
pinia.use(({ store }) => {
	const initialState = JSON.parse(JSON.stringify(store.$state));
	store.$reset = () => {
		store.$patch(initialState)
	}
})
app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(userResize)
// app.use(loadInstall)
MyUse(loadInstall)
app.mount('#app')
app.directive('bg', {
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {}
})
app.directive('gb', () => {
  console.log('只在mounted, updated才会执行时 使用简写');
  
})
const enn = "development"
type Foo = {
  show: () => void
}
type Loading = {
  show: () => void,
  hide: () => void
}
app.config.globalProperties.$bus = bus
app.config.globalProperties.$enn = enn
app.config.globalProperties.foo = {
  show() {
    console.log('你好呀')
  }
}
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $bus: typeof bus;
    $enn: typeof enn;
    foo: Foo;
    $vloading: Loading;
  }
}