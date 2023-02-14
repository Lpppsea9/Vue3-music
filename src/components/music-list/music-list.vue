<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>

    <scroll
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
      v-loading="loading"
      v-no-result:[noResultText]="noResult"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" :rank="rank">
        </song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll.vue'
import SongList from '@/components/base/song-list/song-list.vue'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40
export default {
  name: 'music-list',
  components: { SongList, Scroll },
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String
    },
    pic: {
      type: String
    },
    loading: {
      type: Boolean
    },
    noResultText: {
      type: String,
      default: '自定义没有result'
    }
  },
  data () {
    return {
      playBtnStyle: null,
      rank: [],
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0
    }
  },
  computed: {
    bgImageStyle () {
      const scrollY = this.scrollY
      let paddingTop = '70%'
      let height = 0
      let zIndex = 0
      let translateZ = 0

      // 向上滚动大于允许最大距离
      if (scrollY > this.maxTranslateY) {
        paddingTop = 0
        height = `${RESERVED_HEIGHT}px`
        zIndex = 10
        translateZ = 1
      }

      let scale = 1

      if (scrollY < 0) {
        // 缩放比例
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }

      return {
        backgroundImage: `url(${this.pic}) `,
        paddingTop,
        height,
        zIndex,
        translateZ,
        scale
      }
    },
    filterStyle () {
      const scrollY = this.scrollY
      const imageHeight = this.imageHeight
      // const maxTranslateY =
      const blur = Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) * 20
      return {
        backdropFilter: `blur(${blur}px)`
      }
    },
    scrollStyle () {
      return {
        top: `${this.imageHeight}px`
      }
    },
    noResult() {
      // console.log("计算noResult", !this.loading && !this.songs.length);
      return !this.loading && !this.songs.length
    }
  },
  mounted () {
    // 计算图片的高度
    this.imageHeight = this.$refs.bgImage.clientHeight
    // console.log('高度', this.$refs.bgImage.clientHeight)
    // 计算图片高度减去标题高度40（得到允许向上滚动的最大高度）
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    random () {
      this.randomPlay(this.songs)
    },
    onScroll (pos) {
      this.scrollY = -pos.y
      // console.log('往上滚动', this.scrollY)
    },
    selectItem ({ song, index }) {
      // 播放
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions(['selectPlay', 'randomPlay'])
  }
}
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    i {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);

    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    padding-top: 70%;
    height: 0;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
