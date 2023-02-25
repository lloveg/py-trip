<template>
  <div class="action-bar">
    <div class="chat">
      <i class="icon_chat"></i>
      <span class="text">聊天</span>
    </div>
    <div class="price">
      <span class="final">￥{{ currentHouse.finalPrice }}</span>
      <span class="unit">{{ currentHouse.priceMark }}</span>
      <span class="old">{{ currentHouse.productPrice }}</span>
    </div>
    <div class="order">
      <i class="icon_order"></i>
      <span class="text">预订当前房源</span>
    </div>
  </div>
</template>

<script setup>

defineProps({
  currentHouse: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>
.action-bar {
  display: flex;
  align-items: center;
  height: 60px;
  font-family: PingFangSC-Regular, Helvetica Neue, sans-serif;
  background-color: #fff;
  border-top: 1px solid #ddd;

  .chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    margin: 6px 0;
    border-right: 1px solid #ddd;

    .text {
      margin-top: 5px;
      font-size: 12px;
    }
  }

  .price {
    flex: 1;
    padding: 0 20px;
    font-size: 12px;
    color: #666;

    .final {
      font-size: 16px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .unit {
      margin: 0 6px;
    }

    .old {
      text-decoration: line-through;
    }
  }

  .order {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
    background-image: var(--theme-linear-gradient);

    .text {
      margin-left: 5px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>