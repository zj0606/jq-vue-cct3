/// <reference types="vite/client" />
// new  add
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API_CENTER_OPERATION_KEY: string
  readonly VITE_APP_BASE_API_CENTER_OPERATION_TARGET: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
