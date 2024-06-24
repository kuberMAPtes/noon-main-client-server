import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <Row className="mt-3">
            <Col>
                <Button variant={activeTab === 'following' ? 'danger' : 'secondary'} onClick={() => setActiveTab('following')}>
                    팔로잉 503
                </Button>
            </Col>
            <Col>
                <Button variant={activeTab === 'followers' ? 'dark' : 'secondary'} onClick={() => setActiveTab('followers')}>
                    팔로워 340
                </Button>
            </Col>
            <Col>
                <Button variant={activeTab === 'blocked' ? 'secondary' : 'secondary'} onClick={() => setActiveTab('blocked')}>
                    차단한 회원
                </Button>
            </Col>
        </Row>
    );
};

export default Tabs;
