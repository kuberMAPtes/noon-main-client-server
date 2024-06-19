import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Image, Button, Card, ProgressBar, CardImg } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import profile from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import { FaUserEdit,FaMapMarkedAlt } from "react-icons/fa";
import { MdMoreHoriz  } from "react-icons/md";
import FeedSearchResult from '../../../search/component/FeedSearchResult';
import axios from 'axios';
import FeedItemByMember from '../../component/FeedItemByMember';
const ProfileView = () => {
    const [searchParams] = useSearchParams();
    const initialPage = searchParams.get('page') || 1;

    const memberId = "member_1"

    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(Number(initialPage));
    const [fetchUrl, setFetchUrl] = useState('http://localhost:8080/feed/getFeedListByMember')

    
    const navigate = useNavigate();
    const observer = useRef();


        // 기본적으로 볼 수 있는 피드 목록 가져오기
    const fetchData = async (url, page) => {
        setLoading(true);
    
        // QueryString 설정
        let queryString = `?memberId=${memberId}&page=${page}`;

        // axios 실행
        try {
            const response = await axios.get(url + queryString);
            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setFeeds((prevFeeds) => [...prevFeeds, ...response.data]);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

        
        useEffect(() => {
            fetchData(fetchUrl, page);
        }, [page, fetchUrl]);
    
        // 무한스크롤 구현 (IntersectionObserver)
        const lastFeedElementRef = useCallback((node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        }, [hasMore]);

    return (
        <Container fluid className="vh-100 w-100 d-flex flex-column justify-content-start align-items-center" style={{ paddingTop: '50px', maxWidth:'100%'}}>
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={8} md={6} lg={8}>
                    <Card className="text-center mb-4">
                        <Card.Header>
                            작성예정
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col xs={4}>
                                    <Image 
                                        src="https://via.placeholder.com/150"
                                        roundedCircle
                                        className="mb-3"
                                    />
                                    <Card.Title>Nickname</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                </Col>
                                <Col xs={8}>
                                    <Row>
                                        <Col xs={3}>DajungTemperature</Col>
                                            <Col xs={9}>
                                            <div className="d-flex flex-column align-items-center">
                                            <ProgressBar now={80} label="매우 따뜻함" style={{ width: '100%', height: '1rem'}} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}><hr/></Col>
                                        <Col xs={12}><br/></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>profileIntro</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col>
                                    <div className={profile.circle}>
                                        <div className={profile["circle-text"]}>feedCount</div>
                                    </div>
                                    <div>피드 수</div>
                                </Col>
                                <Col>
                                    <div className={profile.circle}>
                                        <div className={profile["circle-text"]}>buildingSubscriptionCount</div>
                                    </div>
                                    <div>구독한 건물</div>
                                </Col>
                                <Col>
                                    <div className={profile.circle}>
                                        <div className={profile["circle-text"]}>followerCount</div>
                                    </div>
                                    <div>팔로워</div>
                                </Col>
                                <Col>
                                    <div className={profile.circle}>
                                        <div className={profile["circle-text"]}>followingCount</div>
                                    </div>
                                    <div>팔로잉</div>
                                </Col>
                            </Row>
                            
                            <Row className="text-center mt-3">
                                <Col>
                                    <div className={profile.memberCircle}>
                                        <div className={profile["circle-profile-icon"]}><FaUserEdit /></div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={profile.circle}>
                                        <div className={profile["circle-map-icon"]}><FaMapMarkedAlt/></div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={profile.moreCircle}>
                                        <div className={profile["circle-icon"]}><MdMoreHoriz /></div>
                                    </div>
                                </Col>
                            </Row>
                            <Button variant="primary" className="mt-3">미정</Button>
                        </Card.Body>
                    </Card>
                    {feeds.map((feed, index) => (
                        <div
                            key={feed.feedId}
                            className="col-12 mb-4"
                            ref={feeds.length === index + 1 ? lastFeedElementRef : null}
                        >
                            <FeedItemByMember data={feed} />
                        <pre>{JSON.stringify(feed, null, 2)}</pre>
                        </div>
                    ))}
                </Col>
            </Row>
            {/* Footer Component */}
        </Container>
    );
}

export default ProfileView;