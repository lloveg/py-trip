<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box :hot-suggests="hotSuggests" />
    <home-categories />
    <home-content />

    <button @click="btnClick">按钮</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home"

import HomeNavBar from "@/views/home/components/home-nav-bar.vue";
import HomeSearchBox from "@/views/home/components/home-search-box.vue";
import HomeCategories from "@/views/home/components/home-categories.vue";
import HomeContent from "@/views/home/components/home-content.vue";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();
// 1.热门建议
const { hotSuggests } = storeToRefs(homeStore);

const btnClick = () => {
  homeStore.fetchHouselistData();
}
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
