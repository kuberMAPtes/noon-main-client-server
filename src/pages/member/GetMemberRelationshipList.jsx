import React, { useEffect, useState } from "react";
import useInfiniteScrolls from "./component/common/useInfiniteScrolls";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import { useSelector } from "react-redux";
import UseGetMemberRelationshipLists from "./component/memberRelationshipList/UseGetMemberRelationshipLists";
import { initialBlockingList, initialFollowerList, initialFollowingList } from "./function/GetMemberRelationshipListUtil";
import { Col, Container, Row } from "react-bootstrap";
import module from "./component/css/getMemberRelationshipList.module.css";

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

  const [relationshipLists, setRelationshipLists] = useState({
    followingList: initialFollowingList,
    followerList: initialFollowerList,
    blockingList: initialBlockingList,
  });
  const [activeTab, setActiveTab] = useState('following');

  const handleTabClick = (relationshipType) => {
    setActiveTab(relationshipType);
  };

  useEffect(() => {
    const newFollowingList = [];
    const newFollowerList = [];
    const newBlockingList = [];

    memberRelationshipList.forEach((memberRelationship) => {
      if (toId === memberRelationship.fromMember.memberId && memberRelationship.relationshipType === "FOLLOW") {
        newFollowingList.push(memberRelationship);
      } else if (toId === memberRelationship.toMember.memberId && memberRelationship.relationshipType === "FOLLOW") {
        newFollowerList.push(memberRelationship);
      } else if (toId === memberRelationship.fromMember.memberId && memberRelationship.relationshipType === "BLOCK") {
        newBlockingList.push(memberRelationship);
      }
    });

    setRelationshipLists({
      followingList: newFollowingList,
      followerList: newFollowerList,
      blockingList: newBlockingList,
    });
  }, [memberRelationshipList, toId]);

    const getActiveList = () => {
    switch (activeTab) {
      case 'following':
        return relationshipLists.followingList;
      case 'follower':
        return relationshipLists.followerList;
      case 'blocking':
        return relationshipLists.blockingList;
      default:
        return [];
    }
  };

  
  // 서로 관계 확인 및 팔로우/언팔로우 버튼 생성 로직
  //서로관계확인해서 상대방과 내가 서로팔로우했으면 팔로우 취소하기 버튼
  //서로관계확인해서 상대방만 팔로우를 했으면 맞팔로우 하기 버튼과 팔로우 취소하기 버튼
  //서로관계확인해서 나만 상대방을 팔로우했으면 팔로우 취소하기 버튼
  //서로 팔로우 하지 않았으면 팔로우 하기 버튼

  return (
    <Container style={{width:"100%", margin:"0px", maxWidth:"1000px"}}>
      <Row style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        <Col xs={4} sm={4} md={4} lg={4}
        onClick={() => handleTabClick('follower')}
        className={`${module.tab} ${activeTab === 'follower' ? module.active : ''}`}
      >
        팔로워 {followerCount}
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}
        onClick={() => handleTabClick('following')}
        className={`${module.tab} ${activeTab === 'following' ? module.active : ''}`}
        >
        팔로잉 {followingCount}
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}
        onClick={() => handleTabClick('blocking')}
        className={`${module.tab} ${activeTab === 'blocking' ? module.active : ''}`}
        >
        차단 회원 {blockingCount}
        </Col>
      </Row>

      {getActiveList().map((memberRelationship, index) => (//memberRelationship은 이미 팔로우만 있거나 팔로잉만 있거나 선택되었음.
        <div
          key={memberRelationship?.memberRelationshipId ?? `memberRelationship-${index}`}
          className="col-12 mb-4"
          ref={relationshipLists[activeTab]?.length === index + 1 ? lastElementRef : null}
        >
          {/* {alert("멤버관계"+JSON.stringify(memberRelationship))} */}
          {activeTab === 'following' && (
            <div>
              <p>{memberRelationship?.toMember?.nickname} toMember 닉네임</p>
              <hr />
            </div>
          )}
          {activeTab === 'follower' && (
            <div>
              <p>{memberRelationship?.fromMember?.nickname} fromMember 닉네임</p>
              <hr />
            </div>
          )}
          {activeTab === 'blocking' && (
            <div>
              <p>{memberRelationship?.toMember?.nickname} fromMember 닉네임</p>
              <hr />
            </div>
          )}
        </div>
      ))}
      
    </Container>
  );
};

export default GetMemberRelationshipList;