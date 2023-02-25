<template>
  <div class="search">
    <div class="select-time">
      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>
      <div class="item end">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>
    <div class="content">
      <div class="keyword">关键字/位置/民宿</div>
    </div>
    <div class="right">
      <i class="icon-search"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import { formatMonthDay } from '@/utils/format_date'; 

const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);

const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"))
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"))

</script>

<style lang="less" scoped>
.search {
  display: flex;
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  font-size: 14px;
  color: #999;
  border-radius: 6px;
  background-color: #f2f4f6;

  .select-time {
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      align-items: center;
      line-height: normal;
      font-size: 10px;

      .date {
        position: relative;
        color: #333;
        margin: 0 10px 0 3px;
      }
    }

    .end {
      .date::after {
        content: "";
        position: absolute;
        bottom: -1px;
        right: -12px;
        width: 0;
        height: 0;
        border: 4px solid #666;
        border-color: transparent transparent transparent #666;
        border-radius: 3px;
        transform: rotate(45deg);
      }
    }
  }

  .content {
    position: relative;
    flex: 1;
    padding: 0 6px;
    text-align: left;
    border-left: 1px solid #fff;

    .keyword {
      max-width: 155px;
      font-size: 12px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .icon-search {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url(@/assets/img/home/home-sprite.png);
      background-position: -29px -151px;
      background-size: 207px 192px;
    }
  }
}
</style>
