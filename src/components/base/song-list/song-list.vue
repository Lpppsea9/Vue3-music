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
  emits: ['select'],
  methods: {
    selectItem (song, index) {
      this.$emit('select', { song, index })
    },
    getDesc (song) {
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
    line-height: 20px;
    overflow: hidden;
    .name {
      @include no-wrap();
      color: $color-text;
    }
    .desc {
      @include no-wrap();
      margin-top: 4px;
      color: $color-text-d;
    }
  }
}
</style>
