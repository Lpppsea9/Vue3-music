<template>
  <!-- <Ref /> -->
  <to-ref />
</template>
<script>
// import Ref from './Ref'
import ToRef from './ToRef';
const myName = '刘鹏'

const myAge = 25

const myLike = 'running'

const myGame = 'cf'

export default {
  name: 'test-demo',
  components: {
    // Ref,
    ToRef
  },
  setup() {
    return {}
  },
}
</script>
