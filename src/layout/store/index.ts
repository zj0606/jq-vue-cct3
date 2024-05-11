import { defineStore } from 'pinia'
import { constant } from './constant'
type User = {
  name: string,
  age: number
}
export const useTestStore = defineStore(constant.Test, {
  state() {
    return {
      user: <User>{},
      hobby: 'xjj',
      count: 0
    }
  },
  // 类似computed 具有缓存性质
  getters: {
    getHobby(state) {
      return state.hobby
    },
    double(state) {
      return state.count * 2
    }
  },
  // 可以执行异步 同步操作
  actions: {
    increase() {
      this.count++;
    }
  }
})