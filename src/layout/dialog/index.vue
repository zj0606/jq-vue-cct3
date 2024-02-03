<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
// vue2 prop value  vue3 prop modelValue
const prop = defineProps<{
  modelValue: boolean,
  textValue: string,
  textValueModifiers: {
    capitalize?: boolean
  }
}>()
const emit = defineEmits(['update:modelValue', 'update:textValue'])
const close = () => {
  emit('update:modelValue', false)
}
const handleIpt = (e: Event) => {
  // const target = e.target?.value 可以拿到数据 但是 ts 语法提示报错
  const target = e.target as HTMLInputElement
  console.log(prop.textValueModifiers);
  let value = target.value
  if (prop.textValueModifiers?.capitalize) {
    value = value.charAt(0).toLocaleUpperCase() + value.slice(1)
  }
  emit('update:textValue', value)
}
</script>
<template>
  <div v-if="modelValue" class="z-dialog">
    <button @click="close">关闭</button>
    我是一个弹窗
    <input type="text" :value="textValue" @input="handleIpt" />
  </div>
</template>

<style scoped lang="scss">
@include b(dialog) {
  width: 400px;
  height: 400px;
  background-color: #f5f5f5;
  position: fixed;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
  margin-left: -200px;
  margin-top: -200px;
}
</style>
