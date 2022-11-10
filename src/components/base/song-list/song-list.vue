<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array
    }
  },
  mounted () {
    console.log('song-list', this.songs)
  },
  methods: {
    selectItem (song, index) {

    },
    getDesc (song) {
      console.log('参数', song)
      return `${song.singer}${song.album}`
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
  }
  .rank {
  }
  .content {
    flex: 1;
  }
}
</style>
