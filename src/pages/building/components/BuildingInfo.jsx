import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../lib/axiosInstance';
import { useSelector } from 'react-redux';
import useMainPage from '../../member/hook/useMainPage';
import { Link } from 'react-router-dom';
import FeedDisplayBoard from '../../feed/component/FeedList/FeedDisplayBoard';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

const BuildingInfo = ({ subscriptionData, setSubscriptionData }) => {
  const navigate = useNavigate();
  
  // 회원 정보
  const member = useSelector((state) => state.auth.member);

  // 프로필 이동
  const [selectedMemberId, setSelectedMemberId] = useState(null); 
  const mainPageUrl = useMainPage(selectedMemberId);

  const [hiddenSubscriptions, setHiddenSubscriptions] = useState(0);

  // 빌딩 아이디
  const { buildingId } = useParams();

  // 건물 정보
  const [profile, setProfile] = useState({
    buildingId: '',
    buildingName: 'XX 빌딩',
    profileActivated: true,
    roadAddr: '',
    longitude: '',
    latitude: '',
    feedAiSummary: ''
  });

  // 구독자 수
  const [subscriber, setSubscriber] = useState(0);

  // 구독자 목록
  const [subscribers, setSubscribers] = useState([]);

  // 건물 정보 가져오기
  const getBuildingProfile = async () => {
    const response = await axiosInstance.get(`/buildingProfile/getBuildingProfile`, {
      params: { buildingId: buildingId }
    });
    setProfile(response.data);
    console.log("건물 정보: " + profile);
  };

  // 구독자 수 가져오기 : Deprecated
  const getSubscriberCnt = async () => {
    const response = await axiosInstance.get(`/buildingProfile/getSubscriberCnt`, {
      params: { buildingId: buildingId }
    });
    setSubscriber(response.data);
    console.log("구독자 수: " + response.data);
  };

  //구독자 목록 가져오기 (공개범위에 따라 조회 가능한 구독자만 보여줌)
  const getSubscribers = async () => {
    const response = await axiosInstance.get(`/buildingProfile/getSubscribers`, {
      params: { buildingId: buildingId, viewerId: member.memberId}
    });
    if(response){
      const visibleSubscribers = response.data.filter(member => member.visible);
      const hiddenSubscribersCnt = response.data.length - visibleSubscribers.length;

      setSubscribers(visibleSubscribers);
      setHiddenSubscriptions(hiddenSubscribersCnt);
      console.log("visibleSubscribers: "+visibleSubscribers);
      console.log("hiddenSubscribersCnt: "+hiddenSubscribersCnt);
    }
    console.log("구독자 목록: " + JSON.stringify(response.data));
  };

  // 회원의 구독여부 체크
  const getSubscriptionStatus = async () => {
    console.log("회원의 구독 여부 확인");

    const response = await axiosInstance.get(`/buildingProfile/getMemberSubscriptionList`, {
      params: { memberId: member.memberId }
    });
    
    const buildingIds = response.data.map(item => item.building.buildingId);
    console.log("이건 구독건물목록", JSON.stringify(response.data));
    console.log("이건 구독건물ID", buildingIds);

    if (buildingIds.includes(Number(buildingId))) {
      setSubscriptionData(true);
      console.log("구독 중인 건물입니다.");
    }
    console.log("구독여부는: ", subscriptionData)
  };

  // 구독하기 or 구독취소
  const addOrDeleteSubscription = async () => {
    if (subscriptionData===true) {
      try {
        const response = await axiosInstance.post('/buildingProfile/deleteSubscription', {
          memberId: member.memberId,
          buildingId: buildingId
        });
        setSubscriptionData(response.data.activated);
        console.log("회원의 삭제된 구독 정보: " + response.data.activated, response.data.memberId, response.data.buildingId);
      } catch (error) {
        console.error('Error fetching deleted subscriptionData status:', error);
      }
    } else {
      try {
        const response = await axiosInstance.post('/buildingProfile/addSubscription', {
          memberId: member.memberId,
          buildingId: buildingId
        });
        setSubscriptionData(response.data.activated);
        console.log("회원의 추가된 구독 정보: " + response.data.activated, response.data.memberId, response.data.buildingId);
      } catch (error) {
        console.error('Error fetching added subscriptionData status:', error);
      }
    }
  };

  const getWikipage = () => {
    navigate(`/getBuildingWiki/${buildingId}`);
  };

   // 피드 요약 결과 가져오기
   const getSummary = async () => {
    const response = await axiosInstance.get(`/buildingProfile/getSummary`, {
      params: { buildingId : buildingId }
    });
    console.log("피드 요약 결과: ", response.data);

    setProfile(prevProfile => ({
      ...prevProfile,
      feedAiSummary: response.data
    }));

  };

  useEffect(() => {
    if (buildingId) {
      getBuildingProfile();
      getSubscriberCnt(); //Deprecated
      getSubscribers();
      getSubscriptionStatus();
    }
  }, [buildingId]);

  useEffect(() => {
    getSubscriberCnt(); //Deprecated
    getSubscribers();
  }, [subscriptionData]);

  useEffect(() => {}, [profile]);

  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
    setTimeout(() => setClickedButton(null), 200);
  };

  return (
    <>  

      <FeedDisplayBoard buildingId={buildingId} />

      <div className="content">
        <Row style={ {margin: "0 auto",marginTop:"20px", width: '95%', height: '90%' }} className="justify-content-center align-items-center">
          <Col md="4">
            <Card className="card-user" style={{border:'3px solid #FFFFFD', marginBottom:'30px'}}>
              <div className="image"></div>
              <br/>
              <CardTitle tag={"h3"}><b>&emsp;{profile.buildingName}</b></CardTitle>
              <CardText>&emsp;{profile.roadAddr}</CardText>

              <Card style={{ width: "80%", margin: "0 auto", marginBottom: '20px'}}>
                <CardBody>
                  <p className="description text-center">
                    {profile.feedAiSummary}
                  </p>
                  <Button
                    block
                    style={{
                      backgroundColor: clickedButton === 'summary' ? '#f3f0ff' : '#9BAAF8',
                      borderColor: '#9BAAF8',
                      borderRadius:'8px'
                    }}
                    onClick={() => {
                      handleButtonClick('summary');
                      getSummary();
                    }}
                  >
                    피드 요약
                  </Button>
                </CardBody>
              </Card>

              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5 style={{textAlign:'center'}}>
                        {subscriber} <br />
                        <small>구독자 수</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="3" md="6" xs="6">
                      <Button
                        block
                        style={{
                          backgroundColor: clickedButton === 'subscribe' ? '#f3f0ff' : '#9BAAF8',
                          borderColor: '#9BAAF8',
                          borderRadius: '50px'
                        }}
                        onClick={() => {
                          handleButtonClick('subscribe');
                          addOrDeleteSubscription();
                        }}
                      >
                        {subscriptionData===true ? '구독 취소' : '구독'}
                      </Button>
                    </Col>
                  </Row>
                  <div style={{ alignItems: 'flex-end',overflowX: 'auto', whiteSpace: 'nowrap', marginTop: '10px',  justifyContent: 'center',}}>
                    {subscribers.map((subscriber, index) => (
                      <div 
                        key={subscriber.member.memberId} 
                        onClick={() => setSelectedMemberId(subscriber.member.memberId)}
                        style={{ 
                          display: 'inline-block', 
                          textAlign: 'center', 
                          marginRight: '10px', 
                          border: '1px solid #ccc', 
                          padding: '10px', 
                        }}
                      >
                        <img
                          src={subscriber.profilePhotoUrl || '/image/defaultMemberProfilePhoto.png'}
                          alt={subscriber.nickname}
                          style={{
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                        <p style={{ margin: '5px 0 0 0' }}>{subscriber.member.nickname}</p>
                      </div>
                    ))}
                    
                    {hiddenSubscriptions>0?
                      <div style={{color:'#596079'}}>+ 숨은 구독자 {hiddenSubscriptions}명😜</div>
                      :
                      ""
                    }
                  </div>

                  {selectedMemberId && (
                    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: '10px' }}>
                      <Link to={mainPageUrl}>
                        <button style={{ backgroundColor: "#9BAAF8", width:'150px', height:'39px' ,borderRadius:'50px' }}>프로필로 이동</button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>

            <Card style={{ width: "100%", margin: "0 auto", marginTop:'20px', marginBottom: '20px'}}>
              <br/>
              <CardTitle tag="h3"><b>&emsp;WIKI</b></CardTitle>
              <CardText>&emsp;건물 정보를 더 자세히 알아보세요!</CardText>
              
                <Button
                  block
                  style={{
                    backgroundColor: clickedButton === 'wiki' ? '#f3f0ff' : '#030722',
                    borderColor: '#E8DEC9'
                  }}
                  onClick={() => {
                    handleButtonClick('wiki');
                    getWikipage();
                  }}
                >
                  위키 보러가기
                </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const styles = {
  subscriberPhotos: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  profilePhoto: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '0 5px',
  },
};

export default BuildingInfo;
