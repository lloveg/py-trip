<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="" />
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span>{{ itemData.location }}</span>
        </div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="new">￥{{ itemData.finalPrice }}</div>
          <div class="old">￥{{ itemData.productPrice }}</div>
          <div class="tip" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {
    margin: 5px;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      border-radius: 6px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }

    .info {
      padding: 8px 10px;
      color: #666;
      font-size: 12px;

      .location {
        display: flex;
        align-items: center;

        img {
          width: 12px;
          height: 12px;
          margin-right: 3px;
        }
      }

      .name {
        margin: 5px 0;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .summary {
        font-size: 12px;
      }

      .price {
        display: flex;
        align-items: center;
        margin-top: 8px;

        .new {
          font-size: 14px;
          color: var(--primary-color);
        }

        .old {
          position: relative;
          top: 1px;
          margin: 0 6px;
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
        }

        .tip {
          background-image: linear-gradient(270deg, #f66, #ff9f9f);
          color: #fff;
          padding: 0 6px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
