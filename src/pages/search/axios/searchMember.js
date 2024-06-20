import axios_api from "../../../lib/axios_api";

export default function searchMember(searchKeyword, page, callback, requesterId) {
  axios_api.get(`/member/searchMember`, {
    params: {
      requesterId,
      searchKeyword,
      page
    }
  }).then((response) => callback(response.data));
}