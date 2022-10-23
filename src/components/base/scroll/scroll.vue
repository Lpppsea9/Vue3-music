<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import userScroll from './use-scroll'

export default {
  name: 'base-scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const rootRef = ref(null)
    const scroll = userScroll(rootRef, props)

    return {
      rootRef,
      scroll
    }
  }
}
</script>
