<template>
  <p>whyRef-demo</p>
  {{ x }}--{{ y }}
  <br />
  {{ z }}
  <br />
  {{ age1 }}
</template>

<script>
import { ref, toRefs, reactive, computed } from 'vue'

function useFeatureX() {
  const state = reactive({
    x: 1,
    y: 1
  })
  return toRefs(state)
}

export default {
  name: 'whyRef-demo',
  setup() {
    const { x, y } = useFeatureX()
    const z = ref('sss')
    const state2 = reactive({
      age: 18
    })

    // computed
    const age1 = computed(() => {
      return state2.age + 1
    })
    console.log('age1 ->', age1);

    setTimeout(() => {
      x.value = 3
      y.value = 4
      z.value = 'KKK'
      state2.age++
    }, 1500)

    return {
      x,
      y,
      z,
      age1
    }
  }
}
</script>
