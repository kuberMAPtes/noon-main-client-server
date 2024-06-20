/**
 * 다른 컴포넌트에서 같은 기능을 사용할 때 여기 파일에 넣습니다.
 * 단 List는 각 페이지에 종속적이므로 포함하지 않습니다.
 */
import axios_api from "../../../lib/axios_api";

// 좋아요 추가 및 삭제
export const toggleLike = async (liked, setLiked, feedId, itemMemberId) => {
  let url = "";
  if (!liked) {
    url = `/feed/addFeedLike/${feedId}/${itemMemberId}`;
  } else {
    url = `/feed/deleteFeedLike/${feedId}/${itemMemberId}`;
  }

  try {
    const response = await axios_api.post(url);
    console.log("좋아요 추가 및 취소 완료 : " + response + " like : " + !liked);
  } catch (e) {
    console.error(e);
  }

  setLiked(!liked);
};

// 북마크 추가 및 삭제
export const toggleBookmark = async (
  bookmarked,
  setBookmarked,
  feedId,
  itemMemberId
) => {
  let url = "";

  if (!bookmarked) {
    url = `/feed/addBookmark/${feedId}/${itemMemberId}`;
  } else {
    url = `/feed/deleteBookmark/${feedId}/${itemMemberId}`;
  }

  try {
    const response = await axios_api.post(url);
    console.log(
      "북마크 추가 및 취소 완료 : " + response + " bookmark : " + !bookmarked
    );
  } catch (e) {
    console.error(e);
  }

  setBookmarked(!bookmarked);
};

// 조회수 증가
export const viewCutUp = async (feedId) => {
  let url = "/feed/viewCutUp/" + feedId;

  try {
    const response = await axios_api.post(url);
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};
