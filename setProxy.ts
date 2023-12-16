/**
 * @description 配置proxy代理
 * @returns proxy 代理
 * @author 
 */
export const setProxy  = {
  [import.meta.env.VITE_APP_BASE_API_CENTER_OPERATION_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_OPERATION_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_CENTER_RESOURCE_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_RESOURCE_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_CENTER_TPC_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_TPC_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_CENTER_BSC_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_BSC_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_CENTER_CCT_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_CCT_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_CENTER_BASE_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_BASE_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_SLS_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_SLS_TARGET,
  },
  [import.meta.env.VITE_APP_BASE_API_OYYS_SEED_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_OYYS_SEED_TARGET,
    changeOrigin: false,
  },
  [import.meta.env.VITE_APP_BASE_API_CENTER_RPC_KEY]: {
    target: import.meta.env.VITE_APP_BASE_API_CENTER_RPC_TARGET,
  },
}
