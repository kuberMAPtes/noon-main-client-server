import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axiosInstance from '../../../lib/axiosInstance';
import { useSelector } from 'react-redux';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";


const BuildingInfo = () => {

    const navigate = useNavigate();
    
    //회원 정보
    const member = useSelector((state) => state.auth.member);

    //회원의 구독 여부
    const [subscription, setSubscription] = useState(false);

    //빌딩 아이디
    const { buildingId } = useParams();

    //건물 정보
    const [profile, setProfile] = useState({
        buildingId: '',
        buildingName: 'XX 빌딩',
        profileActivated: true,
        roadAddr: '',
        longitude: '',
        latitude: '',
        feedAiSummary: ''
      });

    //구독자 수
    const [subscriber, setSubscriber] = useState(0); 





    //건물 정보 가져오기
    const getBuildingProfile = async () => {

      const response = await axiosInstance.get(`/buildingProfile/getBuildingProfile`, {
        params: { buildingId: buildingId }
      });
      setProfile(response.data);
      console.log("건물 정보: "+profile);
    };

    //구독자 수 가져오기
    const getSubscriberCnt = async () => {

      const response = await axiosInstance.get(`/buildingProfile/getSubscriberCnt`, { 
        params: { buildingId: buildingId }
      });
      setSubscriber(response.data);
      console.log("구독자 수: "+response.data);
    };


    //회원의 구독여부 체크
    const getSubscriptionStatus = async () =>{

      const response = await axiosInstance.get(`/buildingProfile/getMemberSubscriptionList`, {
        params: { memberId: member.memberId } 
      }); 

      console.log("회원의 구독 여부 확인");

      const buildingIds = response.data.map(building => building.buildingId);
      if (buildingIds.includes(Number(buildingId))) {
        setSubscription(true);
        console.log("구독 중인 건물입니다.");
      }
      
    }

    //구독하기 or 구독취소
    const addOrDeleteSubscription = async () => {
      

        if (subscription) {

          try {
            
            const response = await axiosInstance.post('/buildingProfile/deleteSubscription', {
              memberId: member.memberId, 
              buildingId: buildingId 
            });
            setSubscription(response.data.activated);
            console.log("회원의 삭제된 구독 정보: "+response.data.activated, response.data.memberId, response.data.buildingId);

          } catch (error) {
            console.error('Error fetching deleted subscription status:', error);
          }

        }else{

          try {

            const response = await axiosInstance.post('/buildingProfile/addSubscription', { 
              memberId: member.memberId, // 현재 회원의 아이디 가져오도록 수정해야함
              buildingId: buildingId 
            });
            setSubscription(response.data.activated);
  
            console.log("회원의 추가된 구독 정보: "+response.data.activated, response.data.memberId, response.data.buildingId);
  
          } catch (error) {
            console.error('Error fetching added subscription status:', error);
          }
          
        }
      
    }



    const getWikipage = () => {
      const baseUrl = process.env.REACT_APP_WIKI_BASE_URL;
      if (!baseUrl) {
          console.error("REACT_APP_WIKI_BASE_URL is not defined");
          return;
      }
      const url = `${baseUrl}sample`; // 테스트를 위해 sample로. 추후 수정 `${baseUrl}${buildingId}`
      window.location.href = url;
    };


    
    useEffect(() => {
      if (buildingId) {
        getBuildingProfile();
        getSubscriberCnt();
        getSubscriptionStatus()
      }
    }, []); 

    

    useEffect(() => {
      getSubscriberCnt();
    }, [subscription]); 




  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
              </div>
              <CardBody>
                <div className="author">
                    <h5 className="title">{profile.buildingName}</h5>
                  <p className="description">{profile.roadAddr}</p>
                </div>
                <p className="description text-center">
                {profile.feedAiSummary}
                </p>
              </CardBody>
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
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <Button block color="primary" onClick={() => addOrDeleteSubscription()}>
                            {subscription ? '구독취소' : '구독'}
                        </Button>
                    </Col>
                    <Col md="4">
                          <Button block color="primary" onClick={getWikipage}>
                            건물 위키 보기
                          </Button>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
           
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BuildingInfo;