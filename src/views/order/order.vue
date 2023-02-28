<template>
  <div class="order">
    <van-sticky>
      <!-- 头部 -->
      <nav-bar left-text="" title="订单列表"></nav-bar>
      <!-- 导航 -->
      <van-tabs v-model:active="currentOrder" title-active-color="#ff9854">
        <template v-for="(item, index) in orderTitles" :key="index">
          <van-tab :title="item" :name="index"></van-tab>
        </template>
      </van-tabs>
    </van-sticky>
    <div class="content">
      <div v-if="orderlist.length">
        <template v-for="(item, index) in orderlist" :key="index">
          <order-item :item-data="item" />
        </template>
      </div>
      <div v-else class="tips">
        <img src="@/assets/img/order/icon-order.png" alt="" />
        <div class="title">近期暂无订单</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getOrderList } from "@/services";

import OrderItem from "./components/order-item.vue";

const currentOrder = ref();
const orderTitles = ["全部订单", "近期订单", "待支付"];
const orderTitleType = ["all", "recent", "pend"];

const orderlist = ref([]);

getOrderList().then((res) => {
  orderlist.value = res.data.data.orders || [];
});

watch(currentOrder, (newValue) => {
  if (newValue !== undefined) {
    getOrderList(orderTitleType[newValue]).then((res) => {
      orderlist.value = res.data.data.orders || [];
    });
  }
});
</script>

<style lang="less" scoped>
.order {
  height: 100vh;
  padding-bottom: 55px;
  // box-sizing: border-box;
  background-color: #f7f8fb;

  .content {
    height: calc(100% - 90px);
    overflow: scroll;

    .tips {
      text-align: center;
      margin-top: 80px;
      img {
        width: 88%;
      }

      .title {
        margin-top: 20px;
        color: #333;
        font-size: 18px;
      }
    }
  }
}
</style>
