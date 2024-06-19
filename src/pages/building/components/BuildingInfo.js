import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

    //회원 아이디(테스트용 임시데이터)
    const [memberId, setMemberId] = useState("member_1");
    
    //회원 아이디(실제 데이터. 리덕스 상태값)
    //const memberId = useSelector((state) => state.auth.memberId);

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

      const response = await axios.get(`http://localhost:8080/buildingProfile/getBuildingProfile`, { /////////////////////////////하드코딩한 부분 수정
        params: { buildingId: buildingId }
      });
      setProfile(response.data);
      console.log("건물 정보: "+profile);
    };

    //구독자 수 가져오기
    const getSubscriberCnt = async () => {

      const response = await axios.get(`http://localhost:8080/buildingProfile/getSubscriberCnt`, { /////////////////////////////하드코딩한 부분 수정
        params: { buildingId: buildingId }
      });
      setSubscriber(response.data);
      console.log("구독자 수: "+response.data);
    };


    //회원의 구독여부 체크
    const getSubscriptionStatus = async () =>{

      const response = await axios.get(`http://localhost:8080/buildingProfile/getMemberSubscriptionList`, { /////////////////////////////하드코딩한 부분 수정
        params: { memberId: memberId }  // 현재 회원의 아이디 가져오도록 수정해야함
      }); 

      const buildingIds = response.data.map(building => building.buildingId);
      if (buildingIds.includes(Number(buildingId))) {
        setSubscription(true);
      }
      
    }

    //구독하기 or 구독취소
    const addOrDeleteSubscription = async () => {
      

        if (subscription) {

          try {
            
            const response = await axios.post('http://localhost:8080/buildingProfile/deleteSubscription', { /////////////////////////////하드코딩한 부분 수정
              memberId: memberId, // 현재 회원의 아이디 가져오도록 수정해야함
              buildingId: buildingId 
            });
            setSubscription(response.data.activated);
            console.log("회원의 삭제된 구독 정보: "+response.data.activated, response.data.memberId, response.data.buildingId);

          } catch (error) {
            console.error('Error fetching deleted subscription status:', error);
          }

        }else{

          try {

            const response = await axios.post('http://localhost:8080/buildingProfile/addSubscription', { /////////////////////////////하드코딩한 부분 수정
              memberId: memberId, // 현재 회원의 아이디 가져오도록 수정해야함
              buildingId: buildingId 
            });
            setSubscription(response.data.activated);
  
            console.log("회원의 추가된 구독 정보: "+response.data.activated, response.data.memberId, response.data.buildingId);
  
          } catch (error) {
            console.error('Error fetching added subscription status:', error);
          }
          
        }
      
    }

    
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
                          <Button block color="primary">
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