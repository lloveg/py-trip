import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue";
import { throttle } from "underscore"

export default function useScroll(elRef) {
  let el = window;

  const isReachBootom = ref(false);

  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  const scrollListenerHandler = throttle(() => {
    // console.log("正在滚动")
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
      // console.log(scrollTop.value)
    }

    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      // console.log("滚动到底部了")
      isReachBootom.value = true;
    }
  }, 100)

  onMounted(() => {
    // 判断有没有传入滚动元素，有则将监听事件绑定到滚动元素上
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onActivated(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onDeactivated(() => {
    // 这里不需要再次检查是否有传值进来(elRef)
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBootom, clientHeight, scrollTop, scrollHeight }
}