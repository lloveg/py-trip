import klRequest from "../request"

export function getCityAll() {
  return klRequest.get({
    url: "/city/all",
    // url: "/cityAll"
  })
}