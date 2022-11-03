<template>
  <div class="singer-detail">ssss</div>
</template>

<script>
import { getSingerDetail } from '@/services/singer'
import { processSongs } from '@/services/song'

export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  async created () {
    const result = await getSingerDetail(this.singer)
    console.log('result=>', result)
    const song = await processSongs(result)
    console.log('song=>', song)
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: absolute;
  width: 100%;
  top: 88px;
  bottom: 0;
  // overflow: scroll;
}
</style>
