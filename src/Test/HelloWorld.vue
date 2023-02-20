<template >
  <div>helloWorld</div>
  <button @click="btnClick">测试emit</button>
</template>

<script>
// import { emit } from 'vue'
export default {
  name: 'helloworld-demo',
  emits: ['onSayHello'],
  setup(props, { emit }) {
   function btnClick () {
     emit('onSayHello', 'hello,Lppp')
   }
   return {
    btnClick
   }
  },
}
</script>
