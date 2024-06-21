import React, { useEffect, useState, useCallback } from "react";
import { getMemberRelationshipList } from "../../function/memberAxios";


const useFetchMemberRelationshipList = (fromId, toId, initialPage) => {

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

  const [memberRelationshipList, setMemberRelationshipList] = useState(initialMemberRelationship);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [blockingCount, setBlockingCount] = useState(0);
  const [page, setPage] = useState(Number(initialPage));

  // 멤버 관계 목록을 가져오는 함수
  const fetchMemberRelationshipList = useCallback(async () => {

    if (!fromId || !toId) return false;

    // alert(`fetchMemberRelationshipList 호출됨: fromId=${fromId}, toId=${toId}, page=${page}`);
    console.log(`fetchMemberRelationshipList 호출됨: fromId=${fromId}, toId=${toId}, page=${page}`);
    console.log("Fetching member relationship list");
    const size = 10; // 페이지당 아이템 수
    const criteria = {
      fromId: fromId,
      toId: toId,
      following: true,
      follower: true,
    };
    const { response, receivedFollowerCount, receivedFollowingCount, receivedBlockingCount } = await getMemberRelationshipList(criteria, page, size);

    // alert(`response 받음: responseLength=${response.length}, receivedFollowerCount=${receivedFollowerCount}, receivedFollowingCount=${receivedFollowingCount}`);

    // 데이터를 받은 경우 상태를 업데이트
    if (response.length > 0) {
      setMemberRelationshipList((prevList) => [...prevList, ...response]);
      setFollowerCount(receivedFollowerCount);
      setFollowingCount(receivedFollowingCount);
      setBlockingCount(receivedBlockingCount);
      setPage((prevPage) => {
        
        // prevPage가 NaN이면 0으로 설정
        const validPrevPage = isNaN(prevPage) ? 0 : Number(prevPage);
        const newPage = validPrevPage + 1;
        console.log(`상태 업데이트: newPage=${newPage}`);
        // alert(`상태 업데이트: newPage=${newPage}`);
        return newPage;
      });
      return true; // 데이터가 더 있음
    } else {
      return false; // 더 이상 데이터 없음
    }
  }, [fromId, toId, page]);

  // 컴포넌트가 처음 렌더링될 때와 fetchMemberRelationshipList 함수가 변경될 때마다 호출
  useEffect(() => {
    fetchMemberRelationshipList();
  }, [fetchMemberRelationshipList]);

  // 상태와 데이터를 반환
  return { memberRelationshipList, followerCount, followingCount,blockingCount, fetchMoreData: fetchMemberRelationshipList };
};

export default useFetchMemberRelationshipList;