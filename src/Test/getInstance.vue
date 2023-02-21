<template>
  <p>getInstance-demo</p>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue';
export default {
  name: 'getInstance-demo',
  data() {
    return {
      x: 1,
      y: 2
    }
  },
  setup() { // beforeCreated created 的合集
    console.log("setup-this1", this); // undefined
    onMounted(() => {
      console.log("setup-this2", this); // undefined
      console.log(instance.data);
    })
    const instance = getCurrentInstance()
    console.log("instance", instance);
    console.log(instance.data); // 为什么获取不到？

    const myNum = ref(1)
    return {
      myNum
    }
  },
  mounted() {
    console.log("mounted-this", this);
    console.log("mounted-y", this.y);
  }
}
</script>
