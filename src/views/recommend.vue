<template>
  <div class="recommend" v-loading:[textLoading]="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders"></Slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li v-for="item in albums" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from '@/components/base/slider/slider.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import { getRecommend } from '@/services/recommend'

export default {
  name: 'top-list',
  components: {
    Slider,
    Scroll
  },
  computed: {
    loading () {
      return !this.sliders.length && !this.albums.length
    }
  },
  data () {
    return {
      sliders: [],
      albums: [],
      textLoading: '自定义载入...........'
    }
  },
  async created () {
    const result = await getRecommend()
    console.log('res', result)
    this.sliders = result.sliders
    this.albums = result.albums
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: 14px;
        color: #ffcd32;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        padding: 0 20px 20px 20px;
      }

      .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: $font-size-medium;
      }

      .name {
        margin-bottom: 10px;
        color: $color-text;
      }

      .title {
        color: $color-text-d;
      }
    }
  }
}
</style>
