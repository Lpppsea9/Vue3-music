<template>
  <p>toRef-demo</p>
  <p>{{ ageRef }}--{{ state.name }} -- {{ state.age }}</p>
  <p>{{ age2Ref }}--{{ stateNoReactive.age }}</p>
  <button @click="handleTest">按钮</button>
</template>
<script>
import { reactive, toRef } from 'vue'

export default {
  name: 'toRef-demo',
  setup() {
    /*
    toRef
      针对一个响应式对象(reactive封装)的prop
      创建一个ref,具有响应式
      两者保持引用关系

      toRef 如果用于普通对象(非响应式对象),产出的结果不具备响应式

      总结: 一个普通对象想要实现响应式，用reactive来实现，一个普通响应式对象里的一个单独属性想要实现响应式, 用toRef
    */
    const state = reactive({
      age: 20,
      name: 'LP',
      sex: 'man'
    })

    const stateNoReactive = {
      age: 21,
      name: 'LP2',
      sex: 'man2'
    }

    const ageRef = toRef(state, 'age')
    const age2Ref = toRef(stateNoReactive, 'age')

    setTimeout(() => {
      state.age = 25
    }, 1500);

    function handleTest() {
      console.log('stateNoReactive', stateNoReactive);
      console.log('age2Ref', age2Ref);
    }

    return {
      state,
      ageRef,
      age2Ref,
      stateNoReactive,
      handleTest
    }
  },
}
</script>
