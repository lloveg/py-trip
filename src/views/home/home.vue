<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box :hot-suggests="hotSuggests" />
  </div>
</template>

<script setup>
import HomeNavBar from "@/views/home/components/home-nav-bar.vue";
import HomeSearchBox from "@/views/home/components/home-search-box.vue";
import useHomeStore from "@/stores/modules/home"
import { storeToRefs } from "pinia";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
// 1.热门建议
const { hotSuggests } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
