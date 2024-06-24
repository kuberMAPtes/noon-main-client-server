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
  const fetchMoreData = useCallback(async () => {

    if (!fromId || !toId) return false;

    // alert(`fetchMoreData 호출됨: fromId=${fromId}, toId=${toId}, page=${page}`);
    console.log(`fetchMoreData 호출됨: fromId=${fromId}, toId=${toId}, page=${page}`);
    console.log("Fetching member relationship list");
    const size = 10; // 페이지당 아이템 수
    const criteria = {
      fromId: fromId,
      toId: toId,
      following: true,
      follower: true,
      blocking: true
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

  // 컴포넌트가 처음 렌더링될 때와 fetchMoreData 함수가 변경될 때마다 호출
  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

  //refetchData 함수. 팔로우 취소 팔로우, 차단 해제, 차단에 사용
  const refetchData = useCallback(async () => {
    if (!fromId || !toId) {
      // alert('fromId 또는 toId가 설정되지 않았습니다.');
      console.log('fromId 또는 toId가 설정되지 않았습니다.');
      return false;
    }
  
    const size = 10;
    let newMemberRelationshipList = [];
    let currentPage = 0;
  
    // axios를 여러 번 요청해야함
    while (currentPage < page) { // page가 현재 페이지임
      const criteria = {
        fromId: fromId,
        toId: toId,
        following: true,
        follower: true,
        blocking: true
      };
  
      console.log(`요청 중: 페이지 ${currentPage}, 기준: `, criteria);
  
      const { response, receivedFollowerCount, receivedFollowingCount, receivedBlockingCount } = await getMemberRelationshipList(criteria, currentPage, size);
  
      console.log(`응답 받음: 페이지 ${currentPage}, 응답: `, response);
  
      newMemberRelationshipList = newMemberRelationshipList.concat(response);
  
      // 팔로워, 팔로잉, 차단 수는 페이지 단위로 받아올 필요 없으므로 첫 페이지에서만 설정
      if (currentPage === 0) {
        setFollowerCount(receivedFollowerCount);
        setFollowingCount(receivedFollowingCount);
        setBlockingCount(receivedBlockingCount);
  
        console.log('첫 페이지 응답 설정: ', {
          receivedFollowerCount,
          receivedFollowingCount,
          receivedBlockingCount
        });
      }
  
      currentPage += 1;
  
      // 응답이 비어있다면 중단
      if (response.length === 0) {
        // alert(`응답이 비어 있음. 페이지 ${currentPage}에서 중단합니다.`);
        console.log(`응답이 비어 있음. 페이지 ${currentPage}에서 중단합니다.`);
        break;
      }
    }
    // alert("최종상태 설정 : " + JSON.stringify(newMemberRelationshipList) + " " + JSON.stringify(currentPage));
  
    setMemberRelationshipList(newMemberRelationshipList);
    setPage(currentPage);
  
    console.log('최종 상태 설정: ', {
      newMemberRelationshipList,
      currentPage
    });
  
  }, [fromId, toId, page]); 

  // 상태와 데이터를 반환
  return { memberRelationshipList, followerCount, followingCount, blockingCount, fetchMoreData, refetchData };
};

export default useFetchMemberRelationshipList;