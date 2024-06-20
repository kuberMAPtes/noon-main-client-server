import React from "react";
import useInfiniteScrolls from "./component/common/useInfiniteScrolls";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import { useSelector } from "react-redux";
import UseGetMemberRelationshipLists from "./component/memberRelationshipList/UseGetMemberRelationshipLists";

const GetMemberRelationshipList = () => {
  //팔로잉 수 가져와야해
  //팔로워 수 가져와야해
  const { fromId, toId, initialPage } = UseGetMemberRelationshipLists();
  const {
    memberRelationshipList,
    setMemberRelationshipList,
    followerCount,
    followingCount,
  } = useFetchMemberRelationshipList(fromId, toId, initialPage);

  const { lastElementRef } = useInfiniteScrolls(
    memberRelationshipList,
    setMemberRelationshipList,
    initialPage
  );

  //가져온거 무한스크롤 해야해

  //서로관계확인해서 상대방과 내가 서로팔로우했으면 팔로우 취소하기 버튼
  //서로관계확인해서 상대방만 팔로우를 했으면 맞팔로우 하기 버튼과 팔로우 취소하기 버튼
  //서로관계확인해서 나만 상대방을 팔로우했으면 팔로우 취소하기 버튼
  //서로 팔로우 하지 않았으면 팔로우 하기 버튼

  return (
    <div>
      <h1>GetMemberRelationshipList</h1>
      {fromId}
      {toId}
      {initialPage}
      {followerCount}
      {followingCount}
      {memberRelationshipList.map((memberRelationship, index) => (
        <div
          key={
            memberRelationship.memberRelationshipId ??
            `memberRelationship-${index}`
          }
          className="col-12 mb-4"
          ref={
            memberRelationshipList.length === index + 1 ? lastElementRef : null
          }
        >
          {/* 마지막 요소에 ref를 설정한다 */}
          {memberRelationship.fromMember.nickname}
          {memberRelationship.toMember.nickname}
          {memberRelationship.relationshipType}
        </div>
      ))}
    </div>
  );
};

export default GetMemberRelationshipList;
