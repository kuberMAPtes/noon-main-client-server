import React from "react";
import { useSelector } from "react-redux";
import useDecryptId from "../common/useDecryptId";
import useGetInitialPage from "../common/useGetInitialPage";

const UseGetMemberRelationshipLists = () => {
  const { initialPage } = useGetInitialPage();
  const { toId } = useDecryptId(); //두가지 파람 필요
  const fromId = useSelector((state) => state.auth.member.memberId);

  return { fromId, toId, initialPage };
};

export default UseGetMemberRelationshipLists;
