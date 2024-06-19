import React from 'react';
import { Card, Image, Row, Col, ProgressBar } from 'react-bootstrap';

const ProfileHeader = () => (
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
        </Card.Body>
    </Card>
);

export default ProfileHeader;
