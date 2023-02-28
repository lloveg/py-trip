<template>
  <div class="favor">
    <!-- 头部 -->
    <nav-bar left-text="旅途">
      <template #title>
        <van-tabs v-model:active="active" type="card">
          <van-tab
            v-for="(item, index) in titles"
            :key="index"
            :title="item"
          ></van-tab>
        </van-tabs>
      </template>
    </nav-bar>
    <!-- 我的收藏 -->
    <div class="my-favor" v-show="active === 0">
      <van-tabs v-model:active="activeName" title-active-color="#ff9854">
        <van-tab title="房屋" name="house">
          <div class="content">
            <template v-for="(item, index) in favorlist" :key="index">
              <search-item :item-data="item" />
            </template>
          </div>
        </van-tab>
        <van-tab title="房东" name="landlord">
          <div class="content">
            <!-- 内容 -->
            <div v-if="landlordlist.length" class="list"></div>

            <div v-else class="no-data">
              <img
                class="icon-no-data"
                src="@/assets/img/favor/empty_favorite.44731802.png"
                alt=""
              />
              <div class="name">暂无收藏</div>
              <div class="desp">
                点击
                <img src="@/assets/img/favor/favor.png" alt="" />
                即可收藏对应的房东
              </div>
              <button class="btn" @click="handleBtnClick">随便去逛逛</button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 浏览历史 -->
    <div class="history" v-show="active === 1">
      <div class="content">
        <template v-for="(item, index) in historylist" :key="index">
          <search-item :item-data="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getFavorList, getHistoryList } from "@/services";

import NavBar from "@/components/nav-bar/nav-bar.vue";
import SearchItem from "@/components/search-item/search-item.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const active = ref(0);
const titles = ["我的收藏", "浏览历史"];
const activeName = ref("house");

// 请求我的收藏
const favorlist = ref([]);
getFavorList().then((res) => {
  favorlist.value = res.data.data.items || [];
});
// 房东列表
const landlordlist = ref([]);
// 请求浏览历史
const historylist = ref([]);
getHistoryList().then((res) => {
  historylist.value = res.data.data.items || [];
});

// 返回首页进行收藏操作
const handleBtnClick = () => {
  router.push("/")
}
</script>

<style lang="less" scoped>
.favor {
  height: 100vh;
  overflow-y: auto;
  background-color: #f7f8fb;

  :deep(.van-tab--card) {
    width: 72px;
  }

  :deep(.van-tabs__nav--card) {
    border-radius: 2px;
  }

  :deep(.van-tab--card.van-tab--active) {
    font-weight: 400;
  }

  .content {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 55px;

    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon-no-data {
        width: 100%;
      }

      .name {
        color: #333;
        font-size: 18px;
        font-weight: 500;
        line-height: 27px;
      }

      .desp {
        color: #666;
        line-height: 18px;
        font-size: 14px;
        margin: 7px auto 36px;

        img {
          position: relative;
          top: 4px;
          width: 12px;
        }
      }

      .btn {
        padding: 0 38px;
        height: 40px;
        line-height: 40px !important;
        font-size: 16px;
        color: #fff;
        background: var(--primary-color);
        border-radius: 20px;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
