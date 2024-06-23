import React from 'react';
import { Container, Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const followers = [
  {
    username: '34915_g380',
    name: '',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s", // Replace with actual image path
  },
  {
    username: 'stephane6585',
    name: '',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s", // Replace with actual image path
  },
  {
    username: 'dh0opestjko',
    name: '김하린',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s", // Replace with actual image path
  },
  {
    username: '8c269sw39i',
    name: '',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s", // Replace with actual image path
  },
  {
    username: 'kms12002',
    name: 'kms',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s", // Replace with actual image path
  },
  {
    username: 'rlagpwjdyu',
    name: '나영',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s"
  },
  {
    username: '__sulfur.min',
    name: '황성민',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s"
  },
  {
    username: 's._.hhh',
    name: '김세현',
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ya9qxUA7YtK-RHIkePuc-IhSgFlOf_7YA&s"
  },
  {
    username: 'blazeful_kbs',
    name: '김범섭',
    imgSrc: 'path/to/image9.jpg', // Replace with actual image path
  }
];

const defaultPhotoUrl = `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`;

const InstagramFollowersView = () => {
  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col className="text-center">
          <h4>팔로워 119명</h4>
          <h4>팔로잉 392명</h4>
        </Col>
      </Row>
      <ListGroup>
        {followers.map((follower, index) => (
          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
            <Row className="align-items-center" style={{width:"100%"}}>
              <Col xs={2}>
                <Image
                src={follower.imgSrc || defaultPhotoUrl}
                style={{width:"100px", height:"100px"}}
                roundedCircle fluid />
              </Col>
              <Col xs={6}>
                <div>{follower.username}</div>
                <div className="text-muted">{follower.name}</div>
              </Col>
              <Col xs={2}>
                <Button variant="link" size="sm">팔로우</Button>
              </Col>
              <Col xs={2}>
                <Button variant="danger" size="sm">삭제</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default InstagramFollowersView;
