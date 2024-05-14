import { defineStore } from 'pinia'
import { constant } from './constant'
import { computed, reactive, ref } from 'vue'
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
// options store
// export const useTestStore = defineStore(constant.Test, {
//   state() {
//     return {
//       user: <User>{},
//       hobby: 'xjj',
//       count: 0
//     }
//   },
//   // 类似computed 具有缓存性质
//   getters: {
//     getHobby(state) {
//       return state.hobby
//     },
//     double(state) {
//       return state.count * 2
//     }
//   },
//   // 可以执行异步 同步操作
//   actions: {
//     increase() {
//       this.count++;
//     },
//     async queryData() {
//       const result = await query()
//       this.user = result
//       this.setHobby(result.name)
//     },
//     setHobby(name: string) {
//       this.hobby = name
//     }
//   }
// })

// 使用setup store
export const useTestStore = defineStore(constant.Test, () => {
  const state = reactive({
    user: <User>{},
    hobby: 'xjj',
    count: 0
  })
  const emp = ref<string>('----')
  // 类似computed 具有缓存性质
  const getHobby = computed(() => {
    return state.hobby
  })
  const double = computed(() => {
    return state.count * 2
  })
  const quadruple = computed(() => {
    return (num: number):number => {
      
      return state.count * num
    }
  })
  // 可以执行异步 同步操作

  const increase = () => {
    state.count++;
  }
  const queryData = async () => {
    const result = await query()
    state.user = result
    setHobby(result.name)
  }
  const setHobby = (name: string) => {
    state.hobby = name
  }
  const setEmp = (name: string) => {
    emp.value = name
  }
  return {
    state, emp, getHobby, double, increase, queryData, setEmp, quadruple
  }
})