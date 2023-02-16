<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background-wrap">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
        <!-- {{ currentSong }} -->
      </div>

      <div class="bottom">
        <div class="dot-wrapper"></div>
        <div class="progress-wrapper">
          <span class="time time-1">进度条</span>
          <div class="progress-bar-wrapper">
            <progress-bar
              ref="barRef"
              :progress="progress"
              @progress-changing=""
              @progress-changed=""
            >
            </progress-bar>
          </div>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i @click="changeMode" :class="playModeIcon"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i @click="prev" class="icon-prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i @click="togglePlay" :class="playIcon"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i @click="next" class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i
              @click="toggleFavorite(currentSong)"
              :class="getFavoriteIcon(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
    ></audio>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue'
import useMode from './use-mode'
import useFavorite from './use-favorite'
import ProgressBar from './progress-bar.vue'

export default {
  name: 'music-player',
  components: {
    ProgressBar
  },
  setup() {
    // data
    const audioRef = ref(null)
    const songReady = ref(false)
    const currentTime = ref(0)

    const store = useStore()
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const currentIndex = computed(() => store.state.currentIndex)
    const playlist = computed(() => store.state.playlist)
    const playing = computed(() => store.state.playing)
    // hooks
    const { playModeIcon, changeMode } = useMode()
    const { getFavoriteIcon, toggleFavorite } = useFavorite()

    // computed
    const playIcon = computed(() => {
      return playing.value ? 'icon-pause' : 'icon-play'
    })
    const disableCls = computed(() => {
      return songReady.value ? '' : 'disabled'
      // return 'disabled'
    })
    const progress = computed(() => {
      return currentTime.value / currentSong.value.dur
    })
    const playMode = computed(() => store.state.playMode)

    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) {
        return
      }
      currentTime.value = 0
      songReady.value = false
      // 这一步直接监听currentSong的变化但没有和playing状态联系
      const audioEl = audioRef.value
      audioEl.src = newSong.url
      audioEl.play()
    })

    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return
      }
      const audioEl = audioRef.value
      newPlaying ? audioEl.play() : audioEl.pause()
    })

    watch(playMode, (newPlayMode) => {
      console.log("监听Mode", newPlayMode)
    })

    // 退出播放页面
    const goBack = () => {
      store.commit('setFullScreen', false)
    }

    // 播放/暂停
    const togglePlay = () => {
      if (!songReady.value) {
        return
      }
      store.commit('setPlayingState', !playing.value)
    }

    //  暂停
    const pause = () => {
      store.commit('setPlayingState', false)
    }

    // 上一首
    function prev() {
      const list = playlist.value
      if (!songReady.value || !list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      } else {
        let index = currentIndex.value - 1
        if (index === -1) {
          index = list.length - 1
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }

    // 下一首
    function next() {
      const list = playlist.value
      if (!songReady.value || !list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      } else {
        let index = currentIndex.value + 1
        if (index === list.length) {
          index = 0
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }

    // 循环播放
    function loop() {
      // 从头循环播放
      const audioEl = audioRef.value
      audioEl.currentTime = 0
      audioEl.play()
    }

    // 监听audio的监听
    function ready() {
      if (songReady.value) {
        return
      }
      songReady.value = true
    }

    // 监听error
    function error() {
      songReady.value = true
    }

    // // 切换播放模式
    // function changeMode() {
    //   console.log("playMode", playMode)
    // }

    return {
      fullScreen,
      currentSong,
      audioRef,
      playIcon,
      disableCls,

      pause,
      goBack,
      togglePlay,
      prev,
      next,
      ready,
      error,
      // use-mode
      playModeIcon,
      changeMode,
      // use-favorite
      toggleFavorite,
      getFavoriteIcon
    }
  },
}
</script>
<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      // 歌曲名
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      // 歌手名
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .progress-wrapper {
        display: flex;
        background: greenyellow;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          i {
            font-size: 30px;
          }
          &.disabled {
            opacity: 0.3;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          // padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
  }
}
</style>
