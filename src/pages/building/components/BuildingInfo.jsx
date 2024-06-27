import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../lib/axiosInstance';
import { useSelector } from 'react-redux';

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

const BuildingInfo = () => {
  const navigate = useNavigate();
  
  // 회원 정보
  const member = useSelector((state) => state.auth.member);

  // 회원의 구독 여부
  const [subscription, setSubscription] = useState(false);

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

  //구독자 목록 가져오기 
  const getSubscribers = async () => {
    const response = await axiosInstance.get(`/buildingProfile/getSubscribers`, {
      params: { buildingId: buildingId }
    });
    setSubscribers(response.data);
    console.log("구독자 목록: " + response.data);
  };

  // 회원의 구독여부 체크
  const getSubscriptionStatus = async () => {
    const response = await axiosInstance.get(`/buildingProfile/getMemberSubscriptionList`, {
      params: { memberId: member.memberId }
    });
    console.log("회원의 구독 여부 확인");

    const buildingIds = response.data.map(building => building.buildingId);
    if (buildingIds.includes(Number(buildingId))) {
      setSubscription(true);
      console.log("구독 중인 건물입니다.");
    }
  };

  // 구독하기 or 구독취소
  const addOrDeleteSubscription = async () => {
    if (subscription) {
      try {
        const response = await axiosInstance.post('/buildingProfile/deleteSubscription', {
          memberId: member.memberId,
          buildingId: buildingId
        });
        setSubscription(response.data.activated);
        console.log("회원의 삭제된 구독 정보: " + response.data.activated, response.data.memberId, response.data.buildingId);
      } catch (error) {
        console.error('Error fetching deleted subscription status:', error);
      }
    } else {
      try {
        const response = await axiosInstance.post('/buildingProfile/addSubscription', {
          memberId: member.memberId,
          buildingId: buildingId
        });
        setSubscription(response.data.activated);
        console.log("회원의 추가된 구독 정보: " + response.data.activated, response.data.memberId, response.data.buildingId);
      } catch (error) {
        console.error('Error fetching added subscription status:', error);
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
  }, [subscription]);

  useEffect(() => {}, [profile]);

  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
    setTimeout(() => setClickedButton(null), 200);
  };

  return (
    <>  
      <div className="content">
        <Row style={ {margin: "0 auto",marginTop:"20px", width: '95%', height: '90%' }} className="justify-content-center align-items-center">
          <Col md="4">
            <Card className="card-user">
              <div className="image"></div>

              <CardTitle>{profile.buildingName}</CardTitle>
              <CardText>{profile.roadAddr}</CardText>

              <Card style={{ width: "80%", margin: "0 auto", marginBottom: '20px'}}>
                <CardBody>
                  <p className="description text-center">
                    {profile.feedAiSummary}
                  </p>
                  <Button
                    block
                    style={{
                      backgroundColor: clickedButton === 'summary' ? '#f3f0ff' : '#9BAAF8',
                      borderColor: '#9BAAF8'
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
                      <h5>
                        {subscriber} <br />
                        <small>구독자 수</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="3" md="6" xs="6">
                      <Button
                        block
                        style={{
                          backgroundColor: clickedButton === 'subscribe' ? '#f3f0ff' : '#9BAAF8',
                          borderColor: '#9BAAF8'
                        }}
                        onClick={() => {
                          handleButtonClick('subscribe');
                          addOrDeleteSubscription();
                        }}
                      >
                        {subscription ? '구독취소' : '구독'}
                      </Button>
                    </Col>
                  </Row>
                  <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginTop: '10px' }}>
                    {subscribers.map((subscriber, index) => (
                      <div 
                        key={subscriber.memberId} 
                        style={{ 
                          display: 'inline-block', 
                          textAlign: 'center', 
                          marginRight: '10px', 
                          border: '1px solid #ccc', 
                          padding: '10px', 
                          borderRadius: '5px'
                        }}
                      >
                        <img
                          src={subscriber.profilePhotoUrl}
                          alt={subscriber.nickname}
                          style={{
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                        <p style={{ margin: '5px 0 0 0' }}>{subscriber.nickname}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card style={{ width: "95%", margin: "0 auto", marginBottom: '20px'}}>
              <CardTitle tag="h5">WIKI</CardTitle>
              <CardText>건물 정보를 더 자세히 알아보세요!</CardText>
              <CardFooter>
                <Button
                  block
                  style={{
                    backgroundColor: clickedButton === 'wiki' ? '#f3f0ff' : '#9BAAF8',
                    borderColor: '#9BAAF8'
                  }}
                  onClick={() => {
                    handleButtonClick('wiki');
                    getWikipage();
                  }}
                >
                  위키 보러가기
                </Button>
              </CardFooter>
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
