import axios_api from "../../../lib/axios_api";

export default function searchFeed(searchKeyword, page, callback) {
  axios_api.get(`/feed/search/${page}`, {
    params: {
      keyword: searchKeyword
    }
  })
    .then((response) => {
      callback(response.data);
    })
}