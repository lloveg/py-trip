<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box :hot-suggests="hotSuggests" />
    <home-categories />

    <div class="search" v-if="isShowSearchBar">
      <search-bar :search-icon="true" height="45px" />
      <!-- :start-date="startDate" :end-date="endDate"  -->
    </div>

    <home-content />

    <!-- <button @click="btnClick">按钮</button> -->
  </div>
</template>


<script>
export default {
  name: "home"
}
</script>
<script setup>
import { watch, ref, onActivated } from "vue";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";

import HomeNavBar from "@/views/home/components/home-nav-bar.vue";
import HomeSearchBox from "@/views/home/components/home-search-box.vue";
import HomeCategories from "@/views/home/components/home-categories.vue";
import HomeContent from "@/views/home/components/home-content.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";

import useScroll from "@/hook/useScroll";


// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();
// 1.热门建议
const { hotSuggests } = storeToRefs(homeStore);

// const btnClick = () => {
//   homeStore.fetchHouselistData();
// };

// 监听window窗口的滚动
// 1.当我们离开页面时, 我们移除监听
// 2.如果别的页面也进行类似的监听, 会编写重复代码
const homeRef = ref();
const { isReachBootom, scrollTop } = useScroll(homeRef);
watch(isReachBootom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBootom.value = false;
    });
  }
});

// 获取开始结束时间
const mainStore = useMainStore();
// const { startDate, endDate } = storeToRefs(mainStore)
// const startDate = "07.12"
// const endDate = "07.13"

// 搜索框显示的控制
// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350;
});

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;

  .search {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
}

.banner {
  img {
    width: 100%;
  }
}
</style>
