import React, { useEffect, useState } from "react";
import useInfiniteScrolls from "./component/common/useInfiniteScrolls";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import { useSelector } from "react-redux";
import UseGetMemberRelationshipLists from "./component/memberRelationshipList/UseGetMemberRelationshipLists";
import { initialBlockingList, initialFollowerList, initialFollowingList } from "./function/GetMemberRelationshipListUtil";

// 팔로잉 팔로워 리스트임
const GetMemberRelationshipList = () => {
  // Redux를 통해 필요한 ID와 페이지 번호를 가져옴

  //fromId(A가) toId(B의) 팔로우,팔로잉 목록을 본다.
  //memberRelationship.fromMember(C)가 toId(B)를 팔로우/팔로잉/차단한다.
  //toId(B)가 memberRelationship.toMember(D)를 팔로우/팔로잉/차단한다.
  const { fromId, toId, initialPage } = UseGetMemberRelationshipLists();
  // alert(`GetMemberRelationshipList 초기화: fromId=${fromId}, toId=${toId}, initialPage=${initialPage}`);

  const {
    memberRelationshipList,
    followerCount,
    followingCount,
    blockingCount,
    fetchMoreData,
  } = useFetchMemberRelationshipList(fromId, toId, Number(initialPage));

  // 무한 스크롤을 위한 커스텀 훅 사용
  const { lastElementRef } = useInfiniteScrolls(fetchMoreData);


  
  const [followingList, setFollowingList] = useState(initialFollowingList);
  const [followerList, setFollowerList] = useState(initialFollowerList);
  const [blockingList, setBlockingList] = useState(initialBlockingList);
  const [activeTab, setActiveTab] = useState('following');

  useEffect(()=> {
    //memberRelationshipList에서 팔로잉, 팔로워, 차단 리스트를 만든다.
    
          {/* if(toId===memberRelationship.fromMember.memberId && memberRelationship.relationshipType==="FOLLOW")이면 팔로잉
              if(toId===memberRelationship.toMember.memberId && memberRelationship.relationshipType==="FOLLOW")이면 팔로워
              if(toId===memberRelationship.fromMember.memberId && memberRelationship.relationshipType==="BLOCK")이면 내가 차단한 목록 */}
  },[memberRelationshipList]);

  // 서로 관계 확인 및 팔로우/언팔로우 버튼 생성 로직
  //서로관계확인해서 상대방과 내가 서로팔로우했으면 팔로우 취소하기 버튼
  //서로관계확인해서 상대방만 팔로우를 했으면 맞팔로우 하기 버튼과 팔로우 취소하기 버튼
  //서로관계확인해서 나만 상대방을 팔로우했으면 팔로우 취소하기 버튼
  //서로 팔로우 하지 않았으면 팔로우 하기 버튼

  return (
    <div>
      <h1>GetMemberRelationshipList</h1>
      프럼아이디{fromId}
      <hr/>
      투아이디{toId}
      <hr/>
      팔로우수{followerCount}
      <hr/>
      팔로워수{followingCount}
      <hr/>
      차단수{blockingCount}
      <hr/>
      {memberRelationshipList.map((memberRelationship, index) => (
        <div
          key={memberRelationship.memberRelationshipId ?? `memberRelationship-${index}`}
          className="col-12 mb-4"
          ref={memberRelationshipList.length === index + 1 ? lastElementRef : null}
        >

          {memberRelationship.fromMember.nickname}프럼닉네임
          {memberRelationship.toMember.nickname}투닉네임
          {memberRelationship.relationshipType}팔로우타입
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default GetMemberRelationshipList;