import React, { useEffect, useState } from "react";
import { getMemberRelationshipList } from "../../function/memberAxios";

const useFetchMemberRelationshipList = (fromId, toId) => {
  const initialMemberRelationship = [
    {
      memberRelationshipId: null,
      relationshipType: null,
      activated: null,
      fromMember: {
        memberId: null,
        nickname: null,
        profilePhotoUrl: null,
      },
      toMember: {
        memberId: null,
        nickname: null,
        profilePhotoUrl: null,
      },
    },
  ];

  const [memberRelationshipList, setMemberRelationshipList] = useState(
    initialMemberRelationship
  );
  // const [loading, setLo]
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);


  useEffect(() => {
    if (!fromId || !toId) return;

    const fetchMemberRelationshipList = async () => {
      // alert("fetchMemberRelationshipList 실행 fromId To Id"
      //     +fromId+" "+toId
      // );
      console.log("Fetching member relationship list");
      const page = 0;
      const size = 2000000000;
      const criteria = {
        fromId: fromId,
        toId: toId,
        following: true,
        follower: true,
      };
      const { response, receivedFollowerCount, receivedFollowingCount } =
        await getMemberRelationshipList(criteria, page, size);
      // alert("유저관계 :: "+JSON.stringify(response));
      // alert("팔로워"+JSON.stringify(receivedFollowerCount));
      // alert("팔로잉"+JSON.stringify(receivedFollowingCount));
      setFollowerCount(receivedFollowerCount);
      setFollowingCount(receivedFollowingCount);
      setMemberRelationshipList(response);
    };

    fetchMemberRelationshipList();
  }, [fromId, toId]);

  return { memberRelationshipList,setMemberRelationshipList, followerCount, followingCount };
};

export default useFetchMemberRelationshipList;