<template>
  <p ref="pDomRef">ref demo {{ ageRef }} {{ state.name }}</p>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  name: "ref-demo",
  setup() {
    const ageRef = ref(20) // 值类型 响应式
    const nameRef = ref('刘鹏')

    const state = reactive({
      name: nameRef
    })

    const pDomRef = ref(null)

    onMounted(() => {
      console.log('pDomRef', pDomRef.value.innerHTML, pDomRef.value);
    })

    setTimeout(() => {
      ageRef.value = 25 // .value 修改值
      nameRef.value = '双越A'
    }, 1000)

    return {
      ageRef,
      state,
      pDomRef
    }
  },
}
</script>
