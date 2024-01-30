<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handleClick">跳转</button>
    <div>{{ name +  age + like }}</div>
    <br>
    <input v-model="userObj" />
    <div>{{ userObj }}</div>
    <button @click="edit">测试</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toRef, reactive, toRaw, computed} from 'vue'
const router = useRouter()
function handleClick() {
  router.push('/about1')
}
// toRef 只能作用于响应式对象，非响应式的视图不更新
const toRefs = <T extends object>(object: T) => {
  const map:any = {}
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) { // 故意多此一举
      // const element = object[key];
      map[key] = toRef(object, key)
    }
  }
  return map
}
const obj = reactive({ name: 'lisa', age: 18, like: '洛丽塔', bar: { baz: '对的'} })
const { name, age, like } = toRefs(obj)
// const toRefs = 
function edit() {
  console.log(obj, obj['__v_raw'], toRaw(obj) );
}
// 对象用法
// let userObj = computed<string>({
//   get() {
//     return obj.name + '--' + obj.like
//   },
//   set(newVal) {
//     const arr:Array<string> = newVal.split('--')
//     obj.name = arr[0]
//     obj.like = arr[1]
//   }
// })
// 函数用法
// 只能接受一个getter 函数不能修改值
let userObj = computed(() => obj.name + '--' + obj.like)

</script>
