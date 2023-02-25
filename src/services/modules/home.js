import klRequest from "../request"

export function getHomeHotSuggests() {
  return klRequest.get({
    url: "/home/hotSuggests",
    // url: "/hotSuggests"
  })
}

export function getHomeCategories() {
  return klRequest.get({
    url: "/home/categories",
    // url: "/categories"
  })
}

export function getHomeHouseList(currentPage) {
  return klRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
    // url: "/houselist"
  })
}