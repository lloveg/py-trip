<template>
  <div class="infos">
    <div class="name">{{ topInfos.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="comment extra">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief.overall }}分</span>
        <span class="title">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="count">
          {{ topInfos.commentBrief.totalCount }}条评论
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div class="position extra">
      <div class="left address">{{ topInfos.nearByPosition.address }}</div>
      <div class="right">
        地图·周边
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topInfos: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.infos {
  padding: 16px;
  background-color: #fff;

  .name {
    margin-bottom: 6px;
    line-height: 24px;
    text-align: justify;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    overflow: hidden;
  }

  .tags {
    margin: 10px 0;

    .item {
      display: inline-block;
      margin: 2px;
      padding: 1px 3px;
      font-size: 12px;
    }
  }

  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    font-size: 12px;
    background-color: #f5f7fa;
    border-radius: 5px;

    .left {
      width: 245px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .score {
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }

      .title {
        margin: 0 3px;
        font-weight: 700;
      }

      .brief {
        color: #666;
      }
    }

    .right {
      color: var(--primary-color);
    }
  }

  .position {
    .address {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>
