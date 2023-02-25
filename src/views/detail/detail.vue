<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
    />

    <!-- <h2>detail: {{ $route.params.id }}</h2> -->
    <!-- <h2>detail: {{ houseId }}</h2> -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="topModule.housePicture.housePics" />
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="topModule" />
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="dynamicModule.landlordModule" />
      <detail-comment name="点评" :ref="getSectionRef" :comment="dynamicModule.commentModule" />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="dynamicModule.rulesModule.orderRules"
      />
      <detail-map name="周边" :ref="getSectionRef" :position="dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">追梦旅途, 永无止境!</div>
    </div>

    <action-bar class="price-bar" :current-house="currentHouse" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getDetailInfos } from "@/services";

import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import useDetailStore from "@/stores/modules/detail";
import { computed } from "@vue/reactivity";

import TabControl from "@/components/tab-control/tab-control.vue";
import ActionBar from "@/components/action-bar/action-bar.vue";
import DetailSwipe from "./components/detail_01-swipe.vue";
import DetailInfos from "./components/detail_02-infos.vue";
import DetailFacility from "./components/detail_03-facility.vue";
import DetailLandlord from "./components/detail_04-landlord.vue";
import DetailComment from "./components/detail_05-comment.vue";
import DetailNotice from "./components/detail_06-notice.vue";
import DetailMap from "./components/detail_07-map.vue";
import DetailIntro from "./components/detail_08-intro.vue";
import useScroll from "@/hook/useScroll";

const route = useRoute();
const router = useRouter();
const houseId = route.params.id;

const onClickLeft = () => {
  router.back();
};

// 发送网络请求
// store里发送请求（不知道为什么有bug）
// const detailStore = useDetailStore();
// detailStore.fetchDetailInfosData(houseId);
// const { detailInfos } = storeToRefs(detailStore);
// const mainPart = computed(() => detailInfos.value.mainPart);
// 组件内发送请求
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
const topModule = computed(() => detailInfos.value.mainPart.topModule);
const dynamicModule = computed(() => detailInfos.value.mainPart.dynamicModule);
const currentHouse = computed(() => detailInfos.value.currentHouse);
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});

// 滚动监听（tab-control）
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => scrollTop.value >= 300);

// 记录各个模块距离顶部的距离
const sectionEls = ref({});
const names = computed(() => Object.keys(sectionEls.value));

// 进行获取元素实例
const getSectionRef = (value) => {
  // 因为返回的时候，销毁组件时也会调用这个函数，所以value是null
  if (!value) return
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
}

// 监听tab-control点击
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let instance = el.offsetTop;
  if (index !== 0) {
    instance = instance - 45
  }
  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
};
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  right: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90px;
  margin-bottom: 62px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}

.price-bar {
  position: fixed;
  z-index: 165;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
