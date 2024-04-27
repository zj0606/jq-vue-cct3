import type { App, VNode } from "vue";
import Loading from './index.vue'
import { createVNode, render } from 'vue'
// 方式-
// const loadInstall = (app: App, ...options: any[]) => {
//   const VNode:VNode = createVNode(Loading)
//   render(VNode, document.body)
//   app.config.globalProperties.$vloading = {
//     show: VNode.component?.exposed?.show,
//     hide: VNode.component?.exposed?.hide
//   }
// }
// export default loadInstall


// 方式二
export default {
  install(app: App, ...options: any[]) {
    const VNode:VNode = createVNode(Loading)
    render(VNode, document.body)
    app.config.globalProperties.$vloading = {
      show: VNode.component?.exposed?.show,
      hide: VNode.component?.exposed?.hide
    }
  }
}