import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigateMainPage } from "../../../util/mainPageUri";
import axios_api from "../../../lib/axios_api";

const useNavigator = () => {
  const navigate = useNavigate();

  const goToFeedDetail = useCallback(
    async (memberId, feedId, focusOnComments = false) => {
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

      const targetUrl = focusOnComments
        ? `/feed/detail?memberId=${memberId}&feedId=${feedId}#comments`
        : `/feed/detail?memberId=${memberId}&feedId=${feedId}`;

      navigate(targetUrl);
    },
    [navigate]
  );

  const goToMemberProfile = useCallback(
    (memberId) => {
      navigateMainPage(memberId, navigate);
    },
    [navigate]
  );

  const goToBuildingProfile = useCallback(
    (buildingId) => {
      navigate(`/getBuildingProfile/${buildingId}`);
    },
    [navigate]
  );

  const goToFeedForm = useCallback(
    (memberId, feedId) => {
      navigate(`/feed/form/${feedId}?memberId=${memberId}`);
    },
    [navigate]
  );

  const backHistory = useCallback(() => {
    navigate(-1);
  });

  const goToDetailNotice = useCallback(
    (feedId) => {
      navigate(`/customerSupport/getNotice/${feedId}`);
    },
    [navigate]
  );

  return {
    goToFeedDetail,
    goToMemberProfile,
    goToBuildingProfile,
    goToFeedForm,
    backHistory,
    goToDetailNotice,
  };
};

export default useNavigator;
