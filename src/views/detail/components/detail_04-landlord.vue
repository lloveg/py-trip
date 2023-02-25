<template>
  <div class="landlord">
    <detail-section title="房东介绍" more-text="查看房东主页">
      <div class="intro">
        <div class="top">
          <img :src="landlord.topScroll" alt="">
        </div>
        <div class="header">
          <div class="left">
            <div class="avatar">
              <img :src="landlord.hotelLogo" alt="">
            </div>
            <div class="info">
              <div class="name">{{ landlord.hotelName }}</div>
              <div class="tags">
                <template v-for="(item, index) in landlord.hotelTags" :key="index">
                  <div class="item" :style="{color: item.tagText.color}">
                    <span>{{ item.tagText.text }}</span>
                    <span class="divider" v-if="index !== landlord.hotelTags.length - 1">|</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="contact">联系房东</div>
          </div>
        </div>
        <div class="bottom"  v-if="landlord.hotelSummary">
          <template v-for="(item, index) in landlord.hotelSummary">
            <div class="item">
              <div class="title">{{ item.title }}</div>
              <div class="score">{{ item.introduction }}</div>
              <div class="desc">{{ item.tip }}</div>
            </div>
          </template>
        </div>
        <div class="noSummary" v-else>暂时还没有评价</div>
      </div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

defineProps({
  landlord: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.intro {
  .top {
    img {
      width: 100%;
      border-radius: 3px;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .left {
      display: flex;

      .avatar {
        img {
          width: 54px;
          height: 54px;
        }
      }

      .info {
        margin-left: 10px;
        .name {
          width: 195px;
          margin-top: 8px;
          font-size: 16px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tags {
          display: flex;
          margin-top: 5px;
          font-size: 12px;

          .divider {
            margin: 0 5px;
          }
        }
      }
    }

    .right {
      .contact {
        padding: 0 12px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
        border-radius: 5px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin: 50px 10px 10px;

    .title {
      color: #999;
    }

    .score {
      margin: 5px 0;
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .desc {
      color: #666;
    }
  }

  .noSummary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
