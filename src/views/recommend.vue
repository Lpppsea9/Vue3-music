<template>
  <div class="recommend">
    推荐页面
    <Slider></Slider>
  </div>
</template>

<script>
import Slider from '@/components/base/slider/slider.vue'
import { getRecommend } from '@/services/recommend'

export default {
  name: 'top-list',
  components: {
    Slider
  },
  async created () {
    const result = await getRecommend()
    console.log('res', result)
  }
}
</script>

<style>
</style>
