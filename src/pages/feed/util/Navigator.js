import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigateMainPage } from "../../../util/mainPageUri";

// 일단 이거 쓰고 나중에 Link로 리팩토링 할 예정
const useNavigator = () => {
  const navigate = useNavigate();

  const goToFeedDetail = useCallback(
    (memberId, feedId) => {
      navigate(`/feed/detail?memberId=${memberId}&feedId=${feedId}`);
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
