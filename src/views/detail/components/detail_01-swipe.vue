<template>
  <div class="detail-swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <!-- <div class="indicator">{{ active + 1 }}/ {{ swipeData.length }} /{{ total }}</div> -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <div class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </div>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  // console.log("mount")
  // console.log(props.swipeData.length)
  // console.log(props.swipeData)
})

// 对数据进行转换
const swipeGroup = {};
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = [];
    swipeGroup[item.enumPictureCategory] = valueArray;
  }
  valueArray.push(item);
}


// 定义转换数据的方法
const nameReg = /【(.*?)\d?】/i;
const getName = (name) => {
  // return name.replace("：", "")
  const result = nameReg.exec(name);
  return result[1];
};

// 获取索引所在的位置
const getCategoryIndex = (item) => {
  // console.log("getCategoryIndex")
  const valueArray = swipeGroup[item.enumPictureCategory];
  // console.log(item)
  // console.log(valueArray)
  // console.log(valueArray.findIndex(data => data === item))
  return valueArray.findIndex(data => data === item) + 1;
}
</script>

<style lang="less" scoped>
.detail-swipe {
  .swipe-list {
    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    padding: 4px 6px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 15px;

    .item {
      padding: 1px 0;
      margin: 0 5px;
      line-height: 1;

      &.active {
        padding: 1px 6px;
        background-color: #fff;
        color: #333;
        border-radius: 8px;
      }
    }
  }
}
</style>
