<template>
  <p>mouse-demo {{ x }} -{{ y }}</p>
</template>

<script>
import useMousePosition from './useMousePosition';

export default {
  name: 'mouse-position-demo',
  setup() {
    const { x, y } = useMousePosition()

    return {
      x, y
    }
  },
}
</script>
