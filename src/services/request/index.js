import axios from "axios"
import useMainStore from "@/stores/modules/main"

import { BASE_URL, TIMEOUT } from "./config"

const mainStore = useMainStore()

class KLRequest {
  constructor(baseURL, timeout = 1000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 请求拦截
    this.instance.interceptors.request.use(config => {
      // 开启loading
      mainStore.isLoading = true;
      return config
    }, err => {
      return err
    })

    // 响应拦截
    this.instance.interceptors.response.use(res => {
      // 关闭loading
      mainStore.isLoading = false;
      return res
    }, err => {
      mainStore.isLoading = false;
      return err
    })
  }

  request(config) {
    // mainStore.isLoading = true;
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data);
        // mainStore.isLoading = false;
      }).catch(err => {
        reject(err);
        // mainStore.isLoading = false;
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new KLRequest(BASE_URL, TIMEOUT)