import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigateMainPage } from "../../../util/mainPageUri";

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
    (feedId) => {
      navigate(`/feed/form/${feedId}`);
    },
    [navigate]
  );

  const backHistory = useCallback(() => {
    navigate(-1);
  });

  return {
    goToFeedDetail,
    goToMemberProfile,
    goToBuildingProfile,
    goToFeedForm,
    backHistory,
  };
};

export default useNavigator;
