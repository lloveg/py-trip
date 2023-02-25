<template>
  <div class="price-counter">
    <div class="section price-content bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">
        <div class="text" @click="actionsClick" :style="{ color: numColor }">
          {{ num }}
        </div>
        <van-action-sheet
          v-model:show="show"
          :actions="actions"
          cancel-text="取消"
          description="选择入住人数"
          close-on-click-action
          @select="onSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const num = ref("人数不限");
const numColor = ref("#999");

const show = ref(false);
const actions = reactive([
  { name: "1人" },
  { name: "2人" },
  { name: "3人" },
  { name: "4人" },
  { name: "5人" },
  { name: "6人" },
  { name: "7人" },
  { name: "8人" },
  { name: "9人" },
  { name: "10人+" },
  { name: "不限人数" },
]);

const actionsClick = () => {
  console.log("actionsClick");
  show.value = true;
};
const onSelect = (item) => {
  // show.value = false;
  if (item.name === "不限人数") {
    numColor.value = "#999";
    return (num.value = "人数不限");
  }
  numColor.value = "#333";
  num.value = item.name;
};
</script>

<style lang="less" scoped>
.price-counter {
  --van-action-sheet-description-font-size: 16px !important;
  --van-action-sheet-description-color: #333 !important;
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    align-items: center;
    height: 44px;
  }

  .end {
    display: flex;
    align-items: center;
    min-width: 30%;
    padding-left: 20px;
    height: 44px;
  }
}

.price-content {
  .start {
    border-right: 1px solid var(--line-color);
  }
}
</style>
