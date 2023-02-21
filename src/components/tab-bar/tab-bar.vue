<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon="props">
            <img
              :src="
                props.active
                  ? getAssetURL(item.imageActive)
                  : getAssetURL(item.image)
              "
            />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar";
import { getAssetURL } from "@/utils/load_assets";
import { ref } from "vue";

const currentIndex = ref(0);
</script>

<style lang="less" scoped>
.tab-bar {
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 38px;
  // }

  :deep(.van-tabbar) {
    border-top: 1px solid #eee;
  }

  img {
    height: 28px;
  }
}
</style>
