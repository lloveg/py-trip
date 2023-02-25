import KLRequest from "../request"

export function getDetailInfos(houseId) {
  return KLRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}