import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { type LoginForm } from '@/interface/user'
// import CryptoJS from 'crypto-js'
export const useUserStore  = defineStore('user', () => {
  const state = reactive({
    userInfo: null
  })
  function login(userInfo:LoginForm, type:string) {
    if (type === 'account-login') {
      console.log(userInfo)

    } else { // phone-login

    }
  }
  return { state, login }
})