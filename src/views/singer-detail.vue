<template>
  <div class="singer-detail">
    <music-list
      :loading="loading"
      :songs="songs"
      :pic="pic"
      :title="title"
    ></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '@/services/singer'
import { processSongs } from '@/services/song'
import MusicList from '@/components/music-list/music-list.vue'

export default {
  name: 'singer-detail',
  components: { MusicList },
  props: {
    singer: Object
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    pic () {
      return this.singer && this.singer.pic
    },
    title () {
      return this.singer && this.singer.name
    }
  },
  async created () {
    const result = await getSingerDetail(this.singer)
    this.songs = await processSongs(result.songs)
    this.loading = false
    console.log('de', this.singer)
  }
}
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
