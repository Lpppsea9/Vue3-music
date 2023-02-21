<template >
  <!-- <div> -->
  <p ref="instancePDom">getInstance-demo</p>
  <!-- </div> -->
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
    const instancePDom = ref(null)

    console.log("setup-this1", this); // undefined
    onMounted(() => {
      console.log("setup-this2", this); // undefined
      console.log(instance.data);

       console.log('instancePDom', instancePDom, instancePDom.value);
    })
    const instance = getCurrentInstance()
    console.log("instance", instance);
    console.log(instance.data); // 为什么获取不到？

    const myNum = ref(1)
    return {
      myNum,
      instancePDom // 需要返回ref dom元素
    }
  },
  mounted() {
    console.log("mounted-this", this);
    console.log("mounted-y", this.y);
  }
}
</script>
