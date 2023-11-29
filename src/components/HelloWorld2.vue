<script>
import { defineComponent, watch } from 'vue'
export default defineComponent({
  props: {
    num: Number,
    name: { type: String, default: '呵呵呵呵'},
    hobby: { type: String, default: 'football'},
    msg: { type: String, default: '你好哦' }
  },
  emits: ['change'],
  setup(props, { emit }) {
    watch(() => props.num, (n, o) => {
      console.log(n,o);
      emit('change', n)
    }, {immediate: true})
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ num }} {{ name }} {{ hobby }}</h1>
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
