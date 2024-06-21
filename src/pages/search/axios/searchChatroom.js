import axios_api from "../../../lib/axios_api";

export default function searchChatroom(searchKeyword, page, callback) {
  axios_api.get(`/chatroom/searchChatroom`, {
    params: {
      searchKeyword,
      page
    }
  }).then((response) => callback(response.data.content));
}

export function isChatroomSearchResultEmpty(data) {
  return data.content.length === 0;
}
