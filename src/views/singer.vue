<template>
  <div class="singer" v-loading="!singerList.length">
    <index-list :singers-data-list="singerList"></index-list>
  </div>
</template>

<script>
import { getSingerList } from '@/services/singer'
import IndexList from '@/components/base/index-list/index-list.vue'

export default {
  name: 'top-singer',
  components: {
    IndexList
  },
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this.handleGetSingerList()
  },

  methods: {
    async handleGetSingerList () {
      const result = await getSingerList()
      this.singerList = result.singers
      console.log('res->', result)
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
}
</style>
