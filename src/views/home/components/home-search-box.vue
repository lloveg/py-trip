<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section bottom-gray-line" @click="showCalendar = true">
      <div class="start date-range">
        <div class="data">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="data">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>

    <!-- 日历 -->
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <price-counter /> 

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
          @click="searchBtnClick(item)"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import { formatMonthDay, getDiffDays } from "@/utils/format_date";
import PriceCounter from "@/components/price-counter/price-counter.vue"
import useMainStore from "@/stores/modules/main";

const router = useRouter();

//定义props
const props = defineProps({
  hotSuggests: {
    type: Array,
    default: () => [],
  },
});

// 位置/城市
const cityClick = () => {
  router.push("/city");
};

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

// 获取城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
// const nowDate = new Date();
// const newDate = new Date();
// newDate.setDate(nowDate.getDate() + 1);

// const startDate = ref(formatMonthDay(nowDate));
// const endDate = ref(formatMonthDay(newDate));
// const stayCount = ref(getDiffDays(nowDate, newDate));

const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore);
// console.log(startDate.value, endDate.value)

const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));
const stayCount = ref(getDiffDays(startDate.value, endDate.value))

const showCalendar = ref(false);
const onConfirm = (value) => {
  // 1.设置日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  // mainStore.startDate = formatMonthDay(selectStartDate);
  // mainStore.endDate = formatMonthDay(selectEndDate);
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndDate;
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);

  // 2.隐藏日历
  showCalendar.value = false;
};

// 搜索按钮点击
const searchBtnClick = (item) => {
  const keyword = item?.tagText?.text ? item.tagText.text : "默认搜索";
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
      keyword,
    },
  });
};
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 78px;
    display: flex;
    align-items: center;

    span {
      position: relative;
      top: 1px;
      color: #666;
      font-size: 12px;
    }

    img {
      width: 18px;
      height: 18px;
      margin-left: 8px;
    }
  }
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

  .data {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      font-size: 15px;
      font-weight: 500;
      color: #333;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 5px 9px;
    margin: 3px 4px;
    font-size: 12px;
    border-radius: 14px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    display: flex;
    justify-content: center;
    width: 380px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    max-height: 50px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    background-image: var(--theme-linear-gradient);
    border-radius: 20px;
  }
}
</style>
