<template>
  <!-- v-loading="!singerList.length" -->
  <div class="singer">
    <index-list :singers-data-list="singerList" @select="handleGetSingerDetail">
    </index-list>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" :singer="curSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/services/singer'
import IndexList from '@/components/base/index-list/index-list.vue'
// import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

export default {
  name: 'top-singer',
  components: {
    IndexList
  },
  data () {
    return {
      singerList: [],
      curSinger: null
    }
  },
  created () {
    this.handleGetSingerList()
  },

  methods: {
    // 获取歌手列表
    async handleGetSingerList () {
      const result = await getSingerList()
      this.singerList = result.singers
    },

    // 点击选择歌手
    handleGetSingerDetail (singer) {
      this.curSinger = singer
      this.caheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },

    caheSinger (singer) {
      sessionStorage.setItem(SINGER_KEY, JSON.stringify(singer))
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  // overflow: scroll;
  z-index: 11;
}
</style>
