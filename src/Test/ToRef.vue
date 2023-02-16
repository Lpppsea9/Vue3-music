<template>
  <p>toRef {{ state.age }}</p>
</template>
<script>
import { reactive, toRef } from 'vue'

export default {
  name: 'toRef-demo',
  setup() {
    const state = reactive({
      name: '刘鹏',
      age: 20
    })

    setTimeout(() => {
      state.age = 24
    }, 1500)

    setTimeout(() => {
      state.age = 30
    }, 3000)

    return {
      state
    }
  },
}
</script>
