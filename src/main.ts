import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局事件总线
import mitt from "mitt";
const bus = mitt()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')


app.config.globalProperties.$bus = bus
declare module "vue" {
  export interface ComponentCustomProperties {
    $bus: typeof bus;
  }
}