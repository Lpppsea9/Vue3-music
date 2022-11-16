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
import { SINGER_KEY } from '@/assets/js/constant'

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
    computedSinger () {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cached = JSON.parse(sessionStorage.getItem(SINGER_KEY))
        if (cached && cached.mid === this.$route.params.id) {
          ret = cached
        }
      }
      return ret
    },
    pic () {
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title () {
      const singer = this.computedSinger
      return singer && singer.name
    }
  },
  async created () {
    // 如果改变路由则computedSinger为null，退回上级路由
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path
      this.$router.push({
        path
      })
      return
    }
    const result = await getSingerDetail(this.computedSinger)
    this.songs = await processSongs(result.songs)
    // this.songs = []

    this.loading = false
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
