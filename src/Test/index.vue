<template>
  <Ref />
  <!-- <to-ref /> -->
  <!-- <to-refs></to-refs> -->
  <!-- <why-ref></why-ref> -->
  <!-- <hello-world @onSayHello="testHello"></hello-world> -->
  <!-- <mouse-position v-if="flag"></mouse-position> -->
  <get-cur-instance></get-cur-instance>
  <hr />
  <button @click="changeFlag">change flag</button>
</template>
<script>
import Ref from './Ref'
// import ToRef from './ToRef';
// import ToRefs from './ToRefs';
// import WhyRef from './WhyRef.vue'
// import HelloWorld from './HelloWorld.vue';
// import MousePosition from './MousePosition/index.vue'
import GetCurInstance from './GetCurInstance.vue'
import { ref } from 'vue'

export default {
  name: 'test-demo',
  components: {
    Ref,
    // ToRef,
    // ToRefs,
    // WhyRef,
    // HelloWorld,
    // MousePosition,
    GetCurInstance
  },
  setup() {
    const flag = ref(true)
    function testHello (data) {
      console.log("父组件接受data", data);
    }

    function changeFlag() {
      flag.value = !flag.value
    }
    return {
      testHello,
      flag,
      changeFlag
    }
  },
}
</script>
