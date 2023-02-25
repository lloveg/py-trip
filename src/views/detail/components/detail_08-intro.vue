<template>
  <div class="intro">
    <div class="title">{{ priceIntro.title }}</div>
    <div class="content">{{ priceIntro.introduction }}</div>
  </div>
</template>

<script setup>

defineProps({
  priceIntro: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>
.intro {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;

  .title {
    font-size: 14px;
    font-weight: 700;
    color: #000;
  }

  .content {
    margin-top: 10px;
    line-height: 1.5;
    font-size: 12px;
    color: #666;
  }
}
</style>