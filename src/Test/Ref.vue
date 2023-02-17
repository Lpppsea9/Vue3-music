<template>
  <p ref="pDomRef">
    ref demo {{ ageRef }} {{ state.name }} {{ arrRef }} -{{ arr }}
  </p>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
// 生成值类型的响应式数据
// 可用于模板和reactive(获取模板的dom元素)
export default {
  name: "ref-demo",
  setup() {
    const ageRef = ref(20) // 值类型 响应式
    const nameRef = ref('刘鹏')
    const arrRef = ref([0, 0])
    const arr = [0, 1]

    const state = reactive({
      name: nameRef
    })

    const pDomRef = ref(null) // dom元素默认为null

    onMounted(() => {
      console.log('pDomRef', pDomRef.value.innerHTML, pDomRef.value);
    })

    setTimeout(() => {
      ageRef.value = 25 // .value 修改值
      nameRef.value = '双越A'
    }, 1000)

    setTimeout(() => {
      arrRef.value[0] = 3
      arr[0] = 3
    }, 1000)

    return {
      ageRef,
      state,
      pDomRef,
      arrRef,
      arr
    }
  },
}
</script>
