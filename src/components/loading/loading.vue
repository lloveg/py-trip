<template>
  <div class="loading" v-show="mainStore.isLoading" @click="loadingClick">
    <div class="loader">
      <div class="loader">
        <div class="justify-content-center jimu-primary-loading"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';


const mainStore = useMainStore();
const loadingClick = () => {
  mainStore.isLoading = false;
}

</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
}

.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.jimu-primary-loading:before,
.jimu-primary-loading:after {
  position: absolute;
  top: 0;
  content: "";
}

.jimu-primary-loading:before {
  left: -19.992px;
}

.jimu-primary-loading:after {
  left: 19.992px;
  -webkit-animation-delay: 0.32s !important;
  animation-delay: 0.32s !important;
}

.jimu-primary-loading:before,
.jimu-primary-loading:after,
.jimu-primary-loading {
  background: #fa8c1d;
  -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
  animation: loading-keys-app-loading 0.8s infinite ease-in-out;
  width: 8px;
  height: 32px;
}

.jimu-primary-loading {
  text-indent: -9999em;
  margin: auto;
  position: absolute;
  right: calc(50% - 6.8px);
  top: calc(50% - 16px);
  -webkit-animation-delay: 0.16s !important;
  animation-delay: 0.16s !important;
}

@keyframes loading-keys-app-loading {
  0%,
  80%,
  100% {
    opacity: 0.75;
    box-shadow: 0 0 #fa8c1d;
    height: 12px;
  }

  40% {
    opacity: 1;
    box-shadow: 0 -8px #fa8c1d;
    height: 45px;
  }
  // linear-gradient(90deg, #, #fcaf3f)
}
</style>
