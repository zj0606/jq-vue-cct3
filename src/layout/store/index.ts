import { defineStore } from 'pinia'
import { constant } from './constant'
type User = {
  name: string,
  age: number
}

const query = ():Promise<User> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'wahahaha',
        age: 100
      })
    }, 2000)
  })
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
    },
    async queryData() {
      const result = await query()
      this.user = result
      this.setHobby(result.name)
    },
    setHobby(name: string) {
      this.hobby = name
    }
  }
})