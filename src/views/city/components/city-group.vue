<template>
  <div class="city-group">
    <van-index-bar highlight-color="#ff9854" :index-list="indexList">
      <van-index-anchor index="热门城市" />
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(item, index) in groupData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(iten, indey) in item.cities" :key="indey">
          <van-cell :title="iten.cityName" @click="cityClick(iten)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useCityStore from "@/stores/modules/city"
import { useRouter } from "vue-router";

// 定义props
const props = defineProps({
  groupData: {
    typeof: Object,
    default: () => ({}),
  },
});

// 动态的索引
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 选中当前城市
  // console.log(city)
  cityStore.currentCity = city

  // 返回上一级
  router.back();
}
</script>

<style lang="less" scoped>
.city-group {
  :deep(.van-index-bar__index) {
    margin-bottom: 2px;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 23px;
  background-color: #fff;

  .city {
    width: 70px;
    height: 28px;
    margin: 6px 0;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
    color: #333;
    background-color: #fff4ec;
    border-radius: 14px;
  }
}
</style>
