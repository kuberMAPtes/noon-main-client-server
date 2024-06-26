import React, { useCallback, useEffect, useState } from 'react';
import module from '../css/getMemberRelationshipList.module.css';
import { handleFollowClickSimple, handleFollowCancelClickSimple } from '../../function/MemberRelationshipUtil';
import { getMemberRelationship } from '../../function/memberAxios';
import NormalButton from '../NormalButton';
import { FaUserPlus } from "react-icons/fa6";

const MemberRelationshipButton = ({
  fromId,
  toId
}) => {
  const [relationshipFourType, setRelationshipFourType] = useState("");

  const fetchMemberRelationship = useCallback(async () => {
    const result = await getMemberRelationship(fromId, toId);

    // result가 NONE FOLLOWER FOLLOWING MUTUAL
    if (result === "NONE") {
      setRelationshipFourType("NONE");
    } else if (result === "FOLLOWER") {
      setRelationshipFourType("FOLLOWER");
    } else if (result === "FOLLOWING") {
      setRelationshipFourType("FOLLOWING");
    } else if (result === "MUTUAL") {
      setRelationshipFourType("MUTUAL");
    }
  }, [fromId, toId]);

  useEffect(() => {
    fetchMemberRelationship();
  }, [fromId, toId, fetchMemberRelationship]);

  const memoHandleFollowClickSimple = useCallback(
    async (otherId) => {
      await handleFollowClickSimple(fromId, otherId);
      fetchMemberRelationship(); // 상태를 업데이트하여 즉시 반영
    },
    [fromId,fetchMemberRelationship]
  );

  const memoHandleFollowCancelClickSimple = useCallback(
    async (otherId) => {
      await handleFollowCancelClickSimple(fromId, otherId);
      fetchMemberRelationship(); // 상태를 업데이트하여 즉시 반영
    },
    [fromId,fetchMemberRelationship]
  );

  let memberRelationshipButton = null;

  if (relationshipFourType === "MUTUAL") {
    memberRelationshipButton = (
      <NormalButton
        size="sm"
        className={module.buttonColorMutual}
        style={{ width: "100%", margin: "20px 0px 20px 0px", padding: "0px",textAlign:"left" }}
        onClick={() => memoHandleFollowCancelClickSimple(toId)}
      >
        <span style={{paddingRight:"20%"}}></span><FaUserPlus/><span style={{paddingLeft:"20%"}}>맞팔로우</span>
      </NormalButton>
    );
  } else if (relationshipFourType === "FOLLOWING") {
    memberRelationshipButton = (
      <NormalButton
        size="sm"
        variant="danger"
        style={{ width: "100%", margin: "20px 0px 20px 0px", padding: "0px",textAlign:"left" }}
        onClick={() => memoHandleFollowCancelClickSimple(toId)}
      >
        <span style={{paddingRight:"20%"}}></span><FaUserPlus/><span style={{paddingLeft:"20%"}}>팔로우 취소</span>
      </NormalButton>
    );
  } else {
    memberRelationshipButton = (
      <NormalButton
        size="sm"
        style={{ width: "100%", margin: "20px 0px 20px 0px", padding: "0px",textAlign:"left" }}
        className={module.buttonColor}
        onClick={() => memoHandleFollowClickSimple(toId)}
      >
        <span style={{paddingRight:"20%"}}></span><FaUserPlus/><span style={{paddingLeft:"22%"}}>팔로우</span>
      </NormalButton>
    );
  }

  return <>{memberRelationshipButton}</>;
};

export default MemberRelationshipButton;
