<template>
  <p>toRefs-demo</p>

  {{ age }}--{{ name }}
  <br />
  {{ ageRef }}-- {{ nameRef }}
</template>

<script>
import { toRefs, reactive } from 'vue'

export default {
  name: 'toRefs-demo',
  setup() {
     /*
    toRefs
      将响应式对象(reactive包装)转换为普通对象
      对象的每一个属性都对应一个ref
      合成函数返回响应式对象（返回时转换为ref）

      总结:
        如果单纯解构响应式对象(reactive包裹)的话，会丢失对象属性的响应式,
        用toRefs包裹响应式对象(reactive包裹)后返回,再结构,不会丢失对象的响应式
    */
    const state = reactive({
      age: 18,
      name: 'Lppp'
    })

    const stateAsRefs = toRefs(state) // 将响应式对象转换成普通对象
    const { age: ageRef, name: nameRef } = stateAsRefs

    setTimeout(() => {
      console.log("sss");
      state.age = 25
      state.name = 'Lppp25'
    }, 1500)

    return {
      // ...state
      ...stateAsRefs,
      ageRef,
      nameRef
    }
  },
}
</script>
