<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <!-- 这里只需要展示不用修改，所以不用双向绑定v-model -->
          <van-rate :model-value="itemScore" :size="15" color="#fff" readonly allow-half />
          <div class="new">￥{{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { computed } from "@vue/reactivity";

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});

const itemScore = computed(() => Number(props.itemData.commentScore))
</script>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {
    position: relative;
    margin: 5px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;

      .summary {
        font-size: 12px;
      }

      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>
