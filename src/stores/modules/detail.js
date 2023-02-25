import { getDetailInfos } from "@/services"
import { defineStore } from "pinia"

const useDetailStore = defineStore("detail", {
  state: () => ({
    detailInfos: {}
  }),
  actions: {
    async fetchDetailInfosData(houseId) {
      const res = await getDetailInfos(houseId);
      this.detailInfos = res.data;
      return res.data
    }
  }
})

export default useDetailStore