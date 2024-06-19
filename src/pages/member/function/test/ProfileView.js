import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample Footer Component (Assuming you have this component)

const ProfileView = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="text-center mt-5">
                        <Card.Header>
                            <Button variant="danger" className="float-right">회원탈퇴하기</Button>
                        </Card.Header>
                        <Card.Body>
                            <Image 
                                src="https://via.placeholder.com/150"
                                roundedCircle
                                className="mb-3"
                            />
                            <Card.Title>John Doe</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Photographer</Card.Subtitle>
                            <Card.Text>
                                <div>다정도도: 매우 따뜻함</div>
                                <div>피드 수: 15</div>
                                <div>구독한 컨텐츠: 25</div>
                                <div>팔로워: 340</div>
                                <div>팔로잉: 503</div>
                            </Card.Text>
                            <Button variant="primary">Edit Profile</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Card>
                        <Card.Header>
                            <div className="d-flex justify-content-between">
                                <div>긍정한잔해</div>
                                <div>버거킹 강남역점</div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>제목: 나는 행복합니다~</Card.Title>
                            <Card.Text>
                                우히히너무좋다진짜ㅋㅋㅋ
                            </Card.Text>
                            <Image 
                                src="https://via.placeholder.com/500x300"
                                fluid
                            />
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">2024/05/21</small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            {/* Footer Component */}
        </Container>
    );
}

export default ProfileView;
