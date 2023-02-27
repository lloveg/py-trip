<template>
  <div class="categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 66px;
  margin-top: 20px;
  padding: 0 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  .item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 73px;

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      margin-top: 5px;
    }
  }
}
</style>