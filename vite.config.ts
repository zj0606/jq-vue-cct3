import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // envPrefix: 'APP_' // APP_ 为自定义开头名
    server: {
      port: 9528, 
      proxy: {
        'center-operation': {
          target: 'http://10.60.146.69:8080'
        },
        'center-resource': {
          target: 'http://10.60.146.68:8080'
        },
        'jq-center-tpc': {
          target: 'http://10.60.146.79:8080'
        },
        'jq-center-bsc': {
          target: 'http://10.60.146.69:8080'
        },
        'jq-center-cct': {
          target: 'http://10.60.146.77:8080'
        },
        '/cct': {
          target: 'http://10.60.146.76:8080',
          changeOrigin: true
        },
        'sls': {
          target: 'http://10.60.146.81:8080'
        },
        'oyys-seed-web': {
          target: 'http://10.60.146.34',
          changeOrigin: false,
        },
        'jq-center-rpc': {
          target: 'http://10.60.146.80:8081'
        }
      }
    },
    css: { // 处理bem 架构
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/bem.scss";`
        }
      }
    }
  } 
})
