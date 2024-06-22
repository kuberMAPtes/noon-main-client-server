import React, { useCallback, useEffect, useState } from "react";
import useInfiniteScrolls from "./component/common/useInfiniteScrolls";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import UseGetMemberRelationshipLists from "./component/memberRelationshipList/UseGetMemberRelationshipLists";
import { initialBlockingList, initialFollowerList, initialFollowingList } from "./function/GetMemberRelationshipListUtil";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import module from "./component/css/getMemberRelationshipList.module.css";
import { handleBlockCancelClick, handleFollowCancelClick, handleFollowClick } from "./function/MemberRelationshipUtil";

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
    refetchData
  } = useFetchMemberRelationshipList(fromId, toId, Number(initialPage));

  // 무한 스크롤을 위한 커스텀 훅 사용
  const { lastElementRef } = useInfiniteScrolls(fetchMoreData);

  
  const [relationshipLists, setRelationshipLists] = useState({
    followingList: initialFollowingList,
    followerList: initialFollowerList,
    mutualFollowingList: initialFollowingList,//상관없음
    blockingList: initialBlockingList,
  });
  const [activeTab, setActiveTab] = useState('following');

  const handleTabClick = (relationshipType) => {
    setActiveTab(relationshipType);
  };

  useEffect(() => {
    const newFollowingList = [];
    const newFollowerList = [];
    const newMutualFollowingList = [];
    const newBlockingList = [];

    memberRelationshipList.forEach((memberRelationship) => {
      //나를 팔로우한 && 내가 팔로우한
      //여기는 fromId임. 리스트에 보여주는게 아니라 버튼의 다이나믹을 담당함. 팔로우/팔로잉버튼...
      if(toId === memberRelationship.fromMember.memberId &&
        toId ===memberRelationship.toMember.memberId &&
        memberRelationship.relationshipType === "FOLLOW") {
        newMutualFollowingList.push(memberRelationship);
      }
      //이건 리스트에 보여주는 것에 쓰임. A가 B의 팔로워목록을 보는거니, B(toId)에 대해 팔로우한 사람들을 보여줌
      else if (toId === memberRelationship.fromMember.memberId && memberRelationship.relationshipType === "FOLLOW") {
        newFollowingList.push(memberRelationship);
      } else if (toId === memberRelationship.toMember.memberId && memberRelationship.relationshipType === "FOLLOW") {
        newFollowerList.push(memberRelationship);
      } else if (toId === memberRelationship.fromMember.memberId && memberRelationship.relationshipType === "BLOCK") {
        newBlockingList.push(memberRelationship);
      }
    });
// yourFollowingFist, myFollowingList 2가지가 있어야함.
    setRelationshipLists({
      followingList: newFollowingList,
      followerList: newFollowerList,
      mutualFollowingList: newMutualFollowingList,
      blockingList: newBlockingList,
    });
  }, [memberRelationshipList, toId]);

  const getActiveList = useCallback(() => {
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
  }, [activeTab, relationshipLists]);

  const defaultPhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s"



  const memoHandleFollowClick = useCallback(
    (toId) => {
      console.log("fromId:", fromId);
      console.log("toId:", toId);
      console.log("toId type:", typeof toId); // toId의 데이터 타입 확인
      alert("팔로우 클릭 " + fromId + " " + toId + " " + refetchData);
      handleFollowClick(fromId, toId, refetchData)}
      ,
    [fromId,refetchData]
  );

  const memoHandleFollowCancelClick = useCallback(
    (toId) => handleFollowCancelClick(fromId, toId, refetchData),
    [fromId,refetchData]
  );

  const memoHandleBlockCancelClick = useCallback(
    (toId) => handleBlockCancelClick(fromId, toId, refetchData),
    [fromId, refetchData]
  );

  
  // 서로 관계 확인 및 팔로우/언팔로우 버튼 생성 로직
  //서로관계확인해서 상대방과 내가 서로팔로우했으면 팔로우 취소하기 버튼
  //서로관계확인해서 상대방만 팔로우를 했으면 맞팔로우 하기 버튼과 팔로우 취소하기 버튼
  //서로관계확인해서 나만 상대방을 팔로우했으면 팔로우 취소하기 버튼
  //서로 팔로우 하지 않았으면 팔로우 하기 버튼

  return (
    <Container style={{width:"100%", margin:"0px", maxWidth:"10000px"}}>
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
        차단한 회원 {blockingCount}
        </Col>
      </Row>

      {getActiveList().map((memberRelationship, index) => (//memberRelationship은 이미 팔로우만 있거나 팔로잉만 있거나 선택되었음.
        <div
          key={memberRelationship?.memberRelationshipId ?? `memberRelationship-${index}`}
          className="col-12 mb-4"
          ref={relationshipLists[activeTab]?.length === index + 1 ? lastElementRef : null}
        >
          {/* {alert("멤버관계"+JSON.stringify(memberRelationship))} */}
          {/* 팔로워 */}
          {activeTab === 'follower' && (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between"
          style={{marginTop:"10px"}}>
          <Row className="align-items-center" style={{width:"100%"}}>
            <Col xs={2}>
              <Image
              src={memberRelationship?.fromMember?.profilePhotoUrl || defaultPhotoUrl}
              roundedCircle fluid />
            </Col>
            <Col xs={6}>
              <div>{memberRelationship?.fromMember?.nickname}</div>
            </Col>
            

            {/* 팔로우버튼은 fromId와 관련있음. 상호팔로우 관계면 보여줄 버튼*/}
            {relationshipLists?.mutualFollowingList?.includes(memberRelationship) && (
            <Col xs={2}>
              <button size="sm" className={module.buttonColorMutual} onClick={()=>memoHandleFollowCancelClick(memberRelationship?.fromMember?.memberId)}>맞팔로우</button>
            </Col>)
            }
            <Col xs={2}>
              <button size="sm" className={module.buttonColor} onClick={()=>memoHandleFollowClick(memberRelationship?.fromMember?.memberId)}>팔로우</button>
            </Col>
          </Row>
        </ListGroup.Item>
          )}
          {/* 팔로잉 */}
          {activeTab === 'following' && (
          <ListGroup.Item key={index} className={`d-flex align-items-center justify-content-between`}
          style={{marginTop:"10px"}}>
            <Row className="align-items-center" style={{width:"100%"}}>
              <Col xs={2}>
                <Image
                src={memberRelationship?.toMember?.profilePhotoUrl || defaultPhotoUrl}
                roundedCircle fluid />
              </Col>
              <Col xs={6} >
                <div>{memberRelationship?.toMember?.nickname}</div>
              </Col>
              <Col xs={2}>
                <Button variant="danger" size="sm" onClick={()=>memoHandleFollowCancelClick(memberRelationship?.toMember?.memberId)}>팔로우 취소</Button>
              </Col>
            </Row>
        </ListGroup.Item>
          )}

          {activeTab === 'blocking' && (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between"
          style={{marginTop:"10px"}}>
          <Row className="align-items-center" style={{width:"100%"}}>
            <Col xs={2}>
              <Image
              src={memberRelationship?.toMember?.profilePhotoUrl || defaultPhotoUrl}
              roundedCircle fluid />
            </Col>
            <Col xs={6}>
              <div>{memberRelationship?.toMember?.nickname}</div>
            </Col>
            <Col xs={2}>
              <button size="sm" style={{paddingLeft:"10px",paddingRight:"10px"}}className={module.buttonColor} onClick={()=>memoHandleBlockCancelClick(memberRelationship?.toMember?.memberId)}>차단 취소</button>
            </Col>
          </Row>
        </ListGroup.Item>
          )}
        </div>
      ))}
      
    </Container>
  );
};

export default GetMemberRelationshipList;