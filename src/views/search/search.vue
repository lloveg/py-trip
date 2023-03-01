<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      shape="round"
      placeholder="搜索广州的景点、地标、房源"
      @search="onSearch"
      @cancel="onCancel"
      @clear = "onClear"
    />

    <div v-if="searchsuggest.length" class="search-result-panel">
      <template v-for="(item, index) in searchsuggest" :key="index">
        <search-result-item
          :key-word="value"
          :name="item.name"
          :type-name="item.itemTypeName"
          :description="item.description"
          :unitPrice="item.unitPrice"
          @item-click="handleResultItemClick"
        />
      </template>
    </div>

    <div v-else class="search-category-panel">
      <search-category
        title="搜索历史"
        :itemDatas="searchStore.getSearchHistorys"
        itemType="pink"
        @tag-click="handleTagClick($event, item)"
      >
        <template #more>
          <div class="clear" @click="handleClearSearchHistory">
            <span class="name">清空</span>
            <i class="icon-delete"></i>
          </div>
        </template>
      </search-category>

      <template v-for="(item, index) in searchPanelDatas" :key="index">
        <search-category
          v-if="item.suggests"
          :title="item.name"
          :itemDatas="item.suggests"
          :itemType="index === 0 ? 'pink' : 'gray'"
          @tag-click="handleTagClick($event, item)"
        ></search-category>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useSearchStore from "@/stores/modules/search";
import { debounce } from "underscore";
import { keywordsearchsuggest } from "@/services";

import SearchResultItem from "./components/search-result-item.vue";
import SearchCategory from "./components/search-category.vue";

const value = ref("");
const searchsuggest = ref([]);

const searchStore = useSearchStore();
const props = defineProps({
  searchPanelDatas: {
    type: Array,
    default: () => [],
  },
});

searchStore.initSearchHistory();

// 今天搜索框的输入
watch(
  value,
  debounce((newValue, oldValue) => {
    if (!newValue.trim()) {
      return;
    }

    if (newValue.trim().length === 0) {
      searchsuggest.value = [];
    }

    // 缓存到历史记录中
    searchStore.addSearchHistory(newValue);

    // loadingStore.changeLoading(true); // 显示加载
    keywordsearchsuggest(newValue)
      .then((res) => {
        searchsuggest.value = res.data.suggests || [];
      })
      .finally(() => {
        // loadingStore.changeLoading(false); // 隐藏加载
      });
  })
);

const emit = defineEmits(["cancel", "search", "tagClick", "resultItemClick"]);
const onSearch = (val) => {
  emit("search", val);
};
const onCancel = () => {
  emit("cancel");
};
const onClear = () => {
  searchsuggest.value = [];
}
const onUpdate = (value) => {
  console.log(object);
  searchsuggest.value = [];
}

const handleTagClick = (subItem, item) => {
  emit("tagClick", { typeName: item.name, keyWord: subItem.name });
};
const handleResultItemClick = (item) => {
  emit("resultItemClick", item);
};
const handleClearSearchHistory = () => {
  searchStore.clearSearchHistory();
};
</script>

<style lang="less" scoped>
:global(.search .van-search--show-action) {
  padding-left: 0px;
}
.search :deep(.van-search) {
  .van-field__left-icon .van-icon-search {
    font-size: 25px;
  }
  .van-field__control::placeholder {
    font-size: 13px;
    color: #ccc !important;
  }
}

.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 0px 20px;
  background-color: white;
}

.search-category-panel {
  overflow-y: scroll;
  padding-top: 30px;
  height: calc(100% - 100px);
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  .clear {
    .name {
      font-size: 12px;
      color: #333;
      padding-right: 4px;
    }
    .icon-delete {
      position: relative;
      top: 1px;
      display: inline-block;
      background-image: url(@/assets/img/home/home-sprite.png);
      background-size: 207px 192px;
      background-position: -150px -133px;
      width: 11px;
      height: 11px;
    }
  }
}
</style>
