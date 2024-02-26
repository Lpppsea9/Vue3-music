<template>
  <!-- <test></test> -->
  <!-- <m-header></m-header> -->
  <m-tab></m-tab>
  <router-view></router-view>
  <player></player>
</template>

<script>
// import Header from '@/components/header/header.vue'
import Tab from "@/components/tab/tab.vue";
import Player from "@/components/player/player.vue";
// import Test from '@/Test/index.vue'

export default {
  components: {
    // MHeader: Header,
    MTab: Tab,
    Player,
    // Test
  },
};
</script>
