<template>
  <div class="comment">
    <detail-section title="热门评论" :more-text="`查看全部${comment.totalCount}条评论`">
      <div class="comment-inner">
        <div class="header">
          <div class="left">
            <div class="score">
              <span class="text">{{ comment.overall }}</span>
              <div class="line"></div>
            </div>
            <div class="info">
              <div class="title">{{ comment.scoreTitle }}</div>
              <div class="count">{{ comment.totalCount }}条评论</div>
              <div class="star">
                <van-rate v-model="comment.overall" color="#ff9645" size="12" readonly allow-half />
              </div>
            </div>
          </div>
          <div class="right">
            <template v-for="(item, index) in comment.subScores" :key="index">
              <span class="item">{{ item }}</span>
            </template>
          </div>
        </div>
        <div class="tags">
          <template v-for="(item, index) in comment.commentTagVo" :key="index">
            <span class="item" :style="{ color: item.color, background: item.backgroundColor }">{{ item.text }}</span>
          </template>
        </div>
        <div class="content">
          <div class="user">
            <div class="avatar">
              <img :src="comment.comment.userAvatars" alt="">
            </div>
            <div class="profile">
              <div class="name">{{ comment.comment.userName }}</div>
              <div class="date">{{ comment.comment.checkInDate }}</div>
            </div>
          </div>
          <div class="text">{{ comment.comment.commentDetail }}</div>
        </div>
      </div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

defineProps({
  comment: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.comment-inner {
  padding: 10px 0;

  .header {
    display: flex;

    .left {
      display: flex;
      align-items: center;

      .score {
        position: relative;
        width: 65px;
        height: 100%;
        color: #333;
        font-weight: 600;

        .text {
          position: relative;
          z-index: 9;
          font-size: 48px;
        }

        .line {
          position: absolute;
          bottom: 6px;
          z-index: 5;
          width: 66px;
          height: 6px;
          background-image: var(--theme-linear-gradient);
          border-radius: 3px;
        }
      }

      .info {
        margin-left: 19px;
        font-size: 12px;
        color: #333;

        .count {
          margin: 3px 0;
          color: #999;
        }
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      .item {
        margin-left: 7px;
        font-size: 12px;
        color: #666;
      }
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;

    .item {
      padding: 3px 5px;
      margin-right: 8px;
      margin-top: 5px;
      font-size: 12px;
      border-radius: 8px;
    }
  }

  .content {
    padding: 10px;
    background-color: #f7f9fb;
    border-radius: 6px;

    .user {
      display: flex;

      .avatar {
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
      
      .profile {
        margin-left: 8px;

        .date {
          margin-top: 3px;
          font-size: 12px;
          color: #999;
        }
      }
    }

    .text {
      margin-top: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
