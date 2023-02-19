import { getCityAll } from "@/services";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {},
    currentCity: {
      cityName: "深圳"
    }
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll();
      this.allCities = res.data;
    }
  }
})

// 导出的是函数，所以引入的时候不能使用对象进行解构
export default useCityStore
