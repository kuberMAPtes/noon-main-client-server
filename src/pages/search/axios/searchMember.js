import axios_api from "../../../lib/axios_api";

export default function searchMember(requesterId, searchKeyword, page, callback) {
  axios_api.get(`/member/searchMember`, {
    params: {
      requesterId,
      searchKeyword,
      page
    }
  }).then((response) => callback(response.data));
}