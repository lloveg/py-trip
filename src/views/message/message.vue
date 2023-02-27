<template>
  <div class="message">
    <!-- 头部 -->
    <nav-bar left-text="" title="消息中心"></nav-bar>
    <!-- 内容 -->
    <div class="content">
      <!-- 内容 -->
      <div v-if="messagelist.length" class="list"></div>

      <div v-else class="no-data">
        <img src="@/assets/img/message/icon_message.png" alt="" />
        <div class="text">暂无聊天消息</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import NavBar from "@/components/nav-bar/nav-bar.vue";

const messagelist = ref([]);
</script>

<style lang="less" scoped>
.message {
  height: 100vh;
  overflow-y: auto;
  background-color: #f7f8fb;
  
  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 55px;

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 100px;

      img {
        width: 88%;
      }
    }
  }
}
</style>
