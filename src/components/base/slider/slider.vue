<template>
  <div class="slide-banner" ref="rootRef">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content">
          <div
            v-for="num in nums"
            class="slide-page"
            :class="'page' + num"
            :key="num"
          >
            page {{ num }}
          </div>
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="num in nums"
          :key="num"
          :class="{ active: currentPageIndex === num - 1 }"
        >
        </span>
      </div>
    </div>
    <div class="btn-wrap">
      <button class="next" @click="nextPage">nextPage</button>
      <button class="prev" @click="prePage">prePage</button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  name: 'slider-item',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const rootRef = ref(null)
    return {
      rootRef
    }
  },
  data () {
    return {
      nums: 4,
      currentPageIndex: 0
    }
  },
  mounted () {
    // this.init()
  },
  beforeUnmount () {
    this.slide.destroy()
  },
  methods: {
    // init () {
    //   this.slide = new BScroll(this.$refs.slide, {
    //     scrollX: true,
    //     scrollY: false,
    //     slide: true,
    //     momentum: false,
    //     bounce: false,
    //     probeType: 3
    //   })
    //   this.slide.on('scrollEnd', this._onScrollEnd)

    //   this.slide.on('slideWillChange', (page) => {
    //     this.currentPageIndex = page.pageX
    //   })

    //   // v2.1.0
    //   this.slide.on('slidePageChanged', (page) => {
    //     console.log('CurrentPage changed to => ', page)
    //   })
    // },
    _onScrollEnd () {
      console.log('CurrentPage => ', this.slide.getCurrentPage())
    },
    nextPage () {
      this.slide.next()
    },
    prePage () {
      this.slide.prev()
    }
  }
}
</script>
<style lang="scss" scoped>
.slide-banner {
  .banner-wrapper {
    position: relative;
  }

  .slide-banner-wrapper {
    min-height: 1px;
    overflow: hidden;
  }

  .slide-banner-content {
    height: 200px;
    white-space: nowrap;
    font-size: 0;

    .slide-page {
      display: inline-block;
      height: 200px;
      width: 100%;
      line-height: 200px;
      text-align: center;
      font-size: 26px;

      &.page1 {
        background-color: #95b8d1;
      }

      &.page2 {
        background-color: #dda789;
      }

      &.page3 {
        background-color: #c3d899;
      }

      &.page4 {
        background-color: #f2d4a7;
      }
    }
  }

  .dots-wrapper {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #eee;

      &.active {
        width: 20px;
        border-radius: 5px;
      }
    }
  }

  .btn-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    button {
      margin: 0 10px;
      padding: 10px;
      color: #fff;
      border-radius: 4px;
      background-color: #666;
    }
  }
}
</style>
