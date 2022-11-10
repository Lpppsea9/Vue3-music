<template>
  <scroll class="index-list" ref="scrollRef" :probe-type="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li v-for="group in singersDataList" :key="group.id" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="onSingerItemClick(item)"
          >
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div v-show="fixedTitle" :style="fixedStyle" class="fixed">
      <div class="fixed-title">
        {{ fixedTitle }}
      </div>
    </div>
    <div
      class="fixed-shortcut"
      @touchstart.prevent.stop="onShortcutTouchStart"
      @touchmove.prevent.stop="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll.vue'
import useFixed from './use-fixed'
import useShortcut from './use-shortcut'

export default {
  name: 'index-list',
  components: {
    Scroll
  },
  props: {
    singersDataList: {
      type: Array,
      default: () => []
    }
  },

  setup (props, { emit }) {
    const { groupRef, onScroll, currentIndex, fixedTitle, fixedStyle } = useFixed(props)
    const { shortcutList, scrollRef, onShortcutTouchStart, onShortcutTouchMove } = useShortcut(props, groupRef)

    // 点击歌手li元素
    function onSingerItemClick (item) {
      emit('select', item)
    }

    return {
      // useFixed
      groupRef,
      onScroll,
      currentIndex,
      fixedTitle,
      fixedStyle,
      // useShortcut
      shortcutList,
      scrollRef,
      onShortcutTouchStart,
      onShortcutTouchMove,

      onSingerItemClick
    }
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: green;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0px 0px 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
      }
    }
  }
  .fixed {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .fixed-shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.active {
        color: $color-theme;
      }
    }
  }
}
</style>
