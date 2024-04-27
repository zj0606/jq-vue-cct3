
import { app } from '@/main'
import type { App } from 'vue'
interface Use {
  install : (app: App, ...options: any[]) => void
}
const installList = new Set()
export function MyUse<T extends Use>(plugin:T, ...options: any[]) {
  if (installList.has(plugin)) {
    throw new Error('报一丝')
  } else {
    plugin.install(app, options)
    installList.add(plugin)
  }
}