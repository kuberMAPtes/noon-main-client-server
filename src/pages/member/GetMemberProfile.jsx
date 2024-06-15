import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import LogoutForm from "./component/LogoutForm";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { getMemberProfile } from "./function/memberAxios";
import { useSelector } from "react-redux";
import { decryptWithIv } from "../../util/crypto";
import { useParams } from "react-router-dom";

const GetMemberProfile = () => {
  console.log("#### GetMemberProfile 렌더링");
  
  const authorization = useSelector((state) => state.auth.authorization);
  const fromId = useSelector((state) => state.auth.member.memberId);
  const { encryptedToId, IV } = useParams();

  const [toId, setToId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decryptToId = (encryptedToId, IV) => {
    try {
      return decryptWithIv(decodeURIComponent(encryptedToId), decodeURIComponent(IV));
    } catch (error) {
      console.error("Error decrypting toId: ", error);
      setError("Error decrypting toId");
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    console.log("URL Parameters - encryptedToId:", encryptedToId, "IV:", IV);
    if (encryptedToId && IV) {
      const decryptedToId = decryptToId(encryptedToId, IV);
      console.log("Decrypted toId: ", decryptedToId);
      setToId(decryptedToId);
    }
  }, [encryptedToId, IV]);

  useEffect(() => {
    if (authorization && fromId && toId) {
      console.log("Fetching member profile data", "Authorization:", authorization, "From ID:", fromId, "To ID:", toId);
      const fetchMemberProfile = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getMemberProfile(fromId, toId);
          console.log("Profile data:", response);
          setProfile(response);
        } catch (error) {
          console.error("Error fetching member profile:", error);
          setError("Error fetching member profile: " + error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMemberProfile();
    }
  }, [authorization, toId, fromId]);

  return (
    <Container className="mt-5">
      <LogoutForm />
      <h1 className="text-center">Member Profile</h1>
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : profile ? (
        <Card>
          <Card.Body>
            <Card.Title>{profile.nickname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Member ID: {profile.memberId}</Card.Subtitle>
            <Card.Text>
              <p>DajungScore: {profile.dajungScore}</p>
              <p>Profile intro: {profile.profileIntro}</p>
              {profile.profilePhotoUrl && <img src={profile.profilePhotoUrl} alt="Profile" className="img-fluid mb-2" />}
            </Card.Text>
            <div>
              <h2>feedDtoList:</h2>
              {profile.feedDtoList &&
                profile.feedDtoList.map((feed) => (
                  <Card key={feed.feedId} className="mb-3">
                    <Card.Body>
                      <Card.Title>{feed.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">빌딩이름: {feed.buildingName}</Card.Subtitle>
                      <Card.Text>
                        <p>피드내용: {feed.feedText}</p>
                        <p>작성자: {feed.writerNickname}</p>
                        <p>작성 시간: {feed.writtenTime}</p>
                        {feed.feedAttachementURL && <img src={feed.feedAttachementURL} alt="첨부 이미지" className="img-fluid" />}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">No profile data available.</Alert>
      )}
      <div className="text-center mt-4">
        <Button variant="link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} />
        </Button>
        <Button variant="link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </Button>
        <Button variant="link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </Button>
      </div>
    </Container>
  );
};

export default GetMemberProfile;
