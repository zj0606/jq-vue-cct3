import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
export const useUserStore  = defineStore('user', () => {

  const state = reactive({
    userInfo: null
  })
  return { state,}
})