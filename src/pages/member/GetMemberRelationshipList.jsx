import React, { useCallback, useEffect, useState } from "react";
import useInfiniteScrolls from "./component/common/useInfiniteScrolls";
import useFetchMemberRelationshipList from "./component/common/useFetchMemberRelationshipList";
import UseGetMemberRelationshipLists from "./component/memberRelationshipList/UseGetMemberRelationshipLists";
import { initialBlockingList, initialFollowerList, initialFollowingList } from "./function/GetMemberRelationshipListUtil";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import module from "./component/css/getMemberRelationshipList.module.css";
import { handleBlockCancelClick, handleFollowCancelClick, handleFollowClick } from "./function/MemberRelationshipUtil";
import { getMemberRelationship } from "./function/memberAxios";
import { navigateMainPage } from "../../util/mainPageUri";
import { useNavigate } from "react-router-dom";


// 팔로잉 팔로워 리스트임
const GetMemberRelationshipList = () => {
  // Redux를 통해 필요한 ID와 페이지 번호를 가져옴
  const navigate = useNavigate();
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

  
  const [yourRelationshipLists, setYourRelationshipLists] = useState({
    followingList: initialFollowingList,
    followerList: initialFollowerList,
    blockingList: initialBlockingList,
  });
  const [myRelationshipLists, setMyRelationshipLists] = useState({
    followingList: initialFollowingList,
    followerList: initialFollowerList,
    mutualFollowingList: initialFollowingList,
    blockingList: initialBlockingList,
  });
  const [activeTab, setActiveTab] = useState('following');
  

  const handleTabClick = (relationshipType) => {
    setActiveTab(relationshipType);
  };

  useEffect(() => {
    const newMyFollowingList = [];
    const newMyFollowerList = [];
    let newMyMutualFollowingList = [];
    const newYourFollowingList = [];
    const newYourFollowerList = [];
    const newYourBlockingList = [];
  
    const fetchRelationships = async () => {
      const promises = memberRelationshipList.map(async (memberRelationship) => {
        if (toId === memberRelationship.fromMember.memberId && memberRelationship.relationshipType === "FOLLOW") {
          newYourFollowingList.push(memberRelationship);
        } else if (toId === memberRelationship.toMember.memberId && memberRelationship.relationshipType === "FOLLOW") {
          newYourFollowerList.push(memberRelationship);
        } else if (toId === memberRelationship.fromMember.memberId && memberRelationship.relationshipType === "BLOCK") {
          newYourBlockingList.push(memberRelationship);
        }
  
        let otherId;
        if(memberRelationship.fromMember.memberId !== toId){
          otherId = memberRelationship.fromMember.memberId;
        }else{
          otherId = memberRelationship.toMember.memberId;
        }
  
        const response = await getMemberRelationship(fromId, otherId);
        if(response === "NONE"){
          return;
        }else if(response === "FOLLOWER"){
          newMyFollowerList.push(memberRelationship);
        }else if(response === "FOLLOWING"){
          newMyFollowingList.push(memberRelationship);
        }else if(response === "MUTUAL"){
          newMyMutualFollowingList.push(memberRelationship);
        }
      });
  
      // 모든 비동기 작업이 완료될 때까지 기다림
      await Promise.all(promises);

      // newMyMutualFollowingList = newMyMutualFollowingList.slice(0,newMyMutualFollowingList.length/2);

      console.log("newMyFollowingList", newMyFollowingList);
      console.log("newMyFollowerList", newMyFollowerList);
      console.log("newMyMutualFollowingList", newMyMutualFollowingList);
      console.log("newYourFollowingList", newYourFollowingList);
      console.log("newYourFollowerList", newYourFollowerList);
      console.log("newYourBlockingList", newYourBlockingList);
      // alert("멈춰!");
      // 리스트를 업데이트
      setYourRelationshipLists({
        followingList: newYourFollowingList,
        followerList: newYourFollowerList,
        blockingList: newYourBlockingList,
      });
  
      setMyRelationshipLists({
        followingList: newMyFollowingList,
        followerList: newMyFollowerList,
        mutualFollowingList: newMyMutualFollowingList
      });
    };
  
    fetchRelationships();
  }, [memberRelationshipList, toId, fromId]);
  



  //이거는 fromId와 관련이 없음. toId와 목록의 회원들에 관련 있음. 3개의 버튼을 누르는 것 뿐임.
  const getActiveList = useCallback(() => {
    switch (activeTab) {
      case 'following':
        return yourRelationshipLists.followingList;
      case 'follower':
        return yourRelationshipLists.followerList;
      case 'blocking':
        return yourRelationshipLists.blockingList;
      default:
        return [];
    }
  }, [activeTab, yourRelationshipLists]);

  const defaultPhotoUrl = `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`;



  const memoHandleFollowClick = useCallback(
    (otherId) => {
      console.log("fromId:", fromId);
      console.log("otherId:", otherId);
      console.log("otherId type:", typeof otherId); // toId의 데이터 타입 확인
      // alert("팔로우 클릭 " + fromId + " " + otherId + " " + refetchData);
      handleFollowClick(fromId, otherId, refetchData)}
      ,
    [fromId,refetchData]
  );

  const memoHandleFollowCancelClick = useCallback(
    (otherId) => handleFollowCancelClick(fromId, otherId, refetchData),
    [fromId,refetchData]
  );

  const memoHandleBlockCancelClick = useCallback(
    (otherId) => handleBlockCancelClick(fromId, otherId, refetchData),
    [fromId, refetchData]
  );

  
  // 서로 관계 확인 및 팔로우/언팔로우 버튼 생성 로직
  //서로관계확인해서 상대방과 내가 서로팔로우했으면 팔로우 취소하기 버튼
  //서로관계확인해서 상대방만 팔로우를 했으면 맞팔로우 하기 버튼과 팔로우 취소하기 버튼
  //서로관계확인해서 나만 상대방을 팔로우했으면 팔로우 취소하기 버튼
  //서로 팔로우 하지 않았으면 팔로우 하기 버튼
  const MemberRelationshipButton = ({ myRelationshipLists, memberRelationship }) => {
  let memberRelationshipButtton= null;
  if (myRelationshipLists?.mutualFollowingList?.includes(memberRelationship)) {
    memberRelationshipButtton = (
      <Col xs={2}>
        <button
          size="sm"
          className={module.buttonColorMutual}
          style={{paddingLeft:"10px",paddingRight:"10px", width:"100px", height:"40px"}}
          onClick={
            fromId === memberRelationship.fromMember.memberId
              ? () => memoHandleFollowCancelClick(memberRelationship?.toMember?.memberId)
              : () => memoHandleFollowCancelClick(memberRelationship?.fromMember?.memberId)
          }
        >
          맞팔로우
        </button>
      </Col>
    );
    //서로 팔로우를 제외했으니, 나만 너를 팔로우 한 경우야.
  } else if (myRelationshipLists?.followingList?.includes(memberRelationship)) {
    memberRelationshipButtton = (
      <Col xs={2}>
        <Button
          size="sm"
          variant="danger"
          style={{paddingLeft:"10px",paddingRight:"10px", width:"100px", height:"40px"}}
          onClick={
            fromId === memberRelationship.fromMember.memberId
              ? () => memoHandleFollowCancelClick(memberRelationship?.toMember?.memberId)
              : () => memoHandleFollowCancelClick(memberRelationship?.fromMember?.memberId)
          }
        >
          팔로우 취소
        </Button>
      </Col>
    );
  } else{
    memberRelationshipButtton = (
      <Col xs={2}>
        <button
          size="sm"
          className={module.buttonColor}
          style={{paddingLeft:"10px",paddingRight:"10px", width:"100px", height:"40px"}}
          onClick={
            fromId === memberRelationship.fromMember.memberId
              ? () => memoHandleFollowClick(memberRelationship?.toMember?.memberId)
              : () => memoHandleFollowClick(memberRelationship?.fromMember?.memberId)
          }
        >
          팔로우
        </button>
      </Col>
    );
  }

  return (
      <>
      {memberRelationshipButtton}
      </>
      );
  };


  const handleImageClick = (memberId) => {
    if (memberId) {
      navigateMainPage(memberId,navigate);
    }
  };

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
        차단 회원 {blockingCount}
        </Col>
      </Row>

      {getActiveList().map((memberRelationship, index) => (//memberRelationship은 이미 팔로우만 있거나 팔로잉만 있거나 선택되었음.
        <div
          key={memberRelationship?.memberRelationshipId ?? `memberRelationship-${index}`}
          className="col-12 mb-4"
          ref={yourRelationshipLists[activeTab]?.length === index + 1 ? lastElementRef : null}
        >
          {/* {alert("멤버관계"+JSON.stringify(memberRelationship))} */}
          {/* 팔로워 */}
          {activeTab === 'follower' && (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between"
          style={{
            marginTop: '10px',
            paddingBottom: index === getActiveList().length - 1 ? '70px' : '0', // 마지막 요소에만 패딩 추가
          }}>
          <Row className="align-items-center" style={{width:"100%",height:"100%",}}>
            <Col xs={2} style={{margin : "0px" ,padding : "0px"}}>
              <Image
              src={memberRelationship?.fromMember?.profilePhotoUrl || defaultPhotoUrl}
              className={module.profilePhotoUrl}
              onClick={()=>handleImageClick(memberRelationship?.fromMember?.memberId)}
              roundedCircle/>
            </Col>
            <Col xs={6}>
              <div>{memberRelationship?.fromMember?.nickname}</div>
            </Col>

            <MemberRelationshipButton
              myRelationshipLists={myRelationshipLists}
              memberRelationship={memberRelationship}
              />
          </Row>
        </ListGroup.Item>
          )}

          {/* 팔로잉 */}
          {activeTab === 'following' && (
          <ListGroup.Item key={index} className={`d-flex align-items-center justify-content-between`}
          style={{
            marginTop: '10px',
            paddingBottom: index === getActiveList().length - 1 ? '70px' : '0', // 마지막 요소에만 패딩 추가
          }}>
            <Row className="align-items-center" style={{width:"100%"}}>
            <Col xs={2} style={{margin : "0px" ,padding : "0px"}}>
                <Image
                src={memberRelationship?.toMember?.profilePhotoUrl || defaultPhotoUrl}
                className={module.profilePhotoUrl}
                onClick={()=>handleImageClick(memberRelationship?.toMember?.memberId)}
                roundedCircle/>
              </Col>
              <Col xs={6} >
                <div>{memberRelationship?.toMember?.nickname}</div>
              </Col>

              <MemberRelationshipButton
              myRelationshipLists={myRelationshipLists}
              memberRelationship={memberRelationship}
              />
            </Row>
        </ListGroup.Item>
          )}

          {(activeTab === 'blocking' && fromId===toId) && (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between"
          style={{
            marginTop: '10px',
            paddingBottom: index === getActiveList().length - 1 ? '70px' : '0', // 마지막 요소에만 패딩 추가
          }}>
          <Row className="align-items-center" style={{width:"100%"}}>
          <Col xs={2} style={{margin : "0px" ,padding : "0px"}}>
              <Image
              src={memberRelationship?.toMember?.profilePhotoUrl || defaultPhotoUrl}
              className={module.profilePhotoUrl}
              onClick={()=>handleImageClick(memberRelationship?.toMember?.memberId)}
              roundedCircle/>
            </Col>
            <Col xs={6}>
              <div>{memberRelationship?.toMember?.nickname}</div>
            </Col>
            <Col xs={2}>
              <button
              size="sm"
              className={module.buttonColor}
              style={{paddingLeft:"10px",paddingRight:"10px", width:"100px", height:"40px"}}
              onClick={()=>memoHandleBlockCancelClick(memberRelationship?.toMember?.memberId)}>차단 취소</button>
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