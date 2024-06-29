import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigateMainPage } from "../../../util/mainPageUri";
import axios_api from "../../../lib/axios_api";

const useNavigator = () => {
  const navigate = useNavigate();

  const goToNoticeDetail = useCallback(
    async (memberId, feedId) => {
      let url = `/feed/viewCutUp/${feedId}`;

      // 조회수 증가
      try {
        const response = await axios_api.post(url);
        if (response.data === feedId) {
          console.log("조회수 증가 성공");
        } else {
          throw new Error("조회수 증가 중 에러가 발생했습니다.");
        }
      } catch (e) {
        console.log(e);
      }

      navigate(`../getNotice/${feedId}`);
    },
    [navigate]
  );


  const goToAddNotice = useCallback(
    (buildingId) => {
      navigate('../addNotice');
    },
    [navigate]
  );

  return {
    goToNoticeDetail,
    goToAddNotice
  };
};

export default useNavigator;
