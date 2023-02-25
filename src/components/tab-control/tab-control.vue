<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="index">
      <div class="tab-control-item" :class="{ active: currentIndex === index }" @click="itemClick(index)">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  titles: {
    type: Array,
    default: () => ({})
  }
})  

const currentIndex = ref(0);
// 这里emits需要是一个数组
const emit = defineEmits(['tabItemClick']);
const itemClick = (index) => {
  currentIndex.value = index;
  emit("tabItemClick", index)
} 

</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;

  .tab-control-item {
    flex: 1;

    &.active {
      color: var(--primary-color);
      font-weight: 700;

      span {
        padding: 8px 12px;
        border-bottom: 3px solid var(--primary-color);
      }
    }
  }
}
</style>