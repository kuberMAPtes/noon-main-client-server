/**
 * 카테고리를 한글 이름으로 변환
 */
const feedCategoryNames = {
  GENERAL: "일반",
  COMPLIMENT: "칭찬하기",
  QUESTION: "QnA",
  EVENT: "이벤트",
  POLL: "투표",
  SHARE: "나눔",
  HELP_REQUEST: "도움 요청",
  MEGAPHONE: "확성기",
  NOTICE: "공지",
};

const FeedCategoryGetter = (category) => {
  return feedCategoryNames[category] || category;
};

export default FeedCategoryGetter;
