<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import DetailSection from "@/components/detail-section/detail-section.vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
});

const mapRef = ref();

let map = ref();
onMounted(() => {
  // 百度地图API
  // const map = new BMapGL.Map(mapRef.value); // 创建地图实例
  // const point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标
  // map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  // const marker = new BMapGL.Marker(point);        // 创建标注
  // map.addOverlay(marker);                     // 将标注添加到地图中
  // 高德地图API
  // 初始化地图并设置中心点、级别、显示模式
  // 页面销毁时好像还调用了一次API，但是获取不到经纬度，所以报错(PS: 54行)
  map = new AMap.Map(mapRef.value, {
    zoom: 13, //级别
    center: [props.position.longitude, props.position.latitude], //中心点坐标
    viewMode: "3D", //使用3D视图
  });

  // 创建一个 Marker 实例：
  const marker = new AMap.Marker({
    position: new AMap.LngLat(
      props.position.longitude,
      props.position.latitude
    ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: "北京",
  });

  // 将创建的点标记添加到已有的地图实例：
  map.add(marker);
});

onUnmounted(() => {
  // 组件销毁时将地图容器也销毁掉,否则不知道为什么会报错
  map.destroy( );
  map = null;
})
</script>

<style lang="less" scoped>
.baidu {
  height: 230px;
}
</style>
