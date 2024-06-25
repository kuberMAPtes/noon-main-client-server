import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, ProgressBar, Button, Form } from "react-bootstrap";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";
import LogoutForm from "../LogoutForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useEncryptId from "../common/useEncryptId";
import NormalButton from "../NormalButton";
import module from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import useMainPage from "../common/useMainPage";
import NicknameInput from "../NicknameInput";
import { handleKeyDown, handleNicknameUpdateChange } from "../../function/AddUpdateMemberUtil";
import ProfilePhotoInput from "../ProfilePhotoInput";
import { updateProfilePhotoUrl } from "../../function/memberAxios";

//4가지 파라미터 다 WAS에서 받아야함
//> setProfile등등..필요
//> 상위컴포넌트의 커스텀 훅에서 하고 여기서는 받아쓰자.
const ProfileBody = ({
  toId,
  fromId,
  profile,
  feeds,
  buildingSubscriptionCount,
  followerCount,
  followingCount,
}) => {
  const [dajungTemperature, setDajungTemperature] = useState("");
  const defaultPhotoUrl = `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`;
  const member = useSelector((state) => state.auth.member);

  const mainPageUrl = useMainPage(member.memberId);
  const [nickname, setNickname] = useState(member.nickname);
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const handleImageError = (e) => {
    e.target.src = defaultPhotoUrl;
  };
  
  const handleImageUpload = async (file) => {
    try {
      const updatedProfilePhotoUrl = await updateProfilePhotoUrl(member.memberId, file);
      // 여기서 상태를 업데이트하여 새로운 프로필 사진 URL을 반영합니다.
      console.log("업로드된 파일 URL:", updatedProfilePhotoUrl);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  useEffect(() => {
    if (profile.dajungScore >= 80) {
      setDajungTemperature("매우 따뜻함");
    } else if (profile.dajungScore >= 60) {
      setDajungTemperature("따뜻함");
    } else if (profile.dajungScore >= 40) {
      setDajungTemperature("보통");
    } else if (profile.dajungScore >= 20) {
      setDajungTemperature("차가움");
    } else {
      setDajungTemperature("매우 차가움");
    }
  }, [profile.dajungScore]);


  if (!profile.nickname) {
    return null;
  }

  return (
    <Card>
      <Card.Body style={{border: "2px solid #91A7FF", borderRadius:"7px"}}>
        <Row className="mb-3">
          <Col xs={4} className="d-flex flex-column align-items-center" style={{margin:"0px"}}>
          <ProfilePhotoInput
            profile={profile}
            defaultPhotoUrl={defaultPhotoUrl}
            handleImageUpload={handleImageUpload}
          />
            <Card.Title
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
            <Form>
              <NicknameInput
                nickname={nickname}
                setNickname={setNickname}
                nicknameValidationMessage={nicknameValidationMessage}
                setNicknameValidationMessage={setNicknameValidationMessage}
                isNicknameValid={isNicknameValid}
                setIsNicknameValid={setIsNicknameValid}
                mainPageUrl={mainPageUrl}
                handleKeyDown={handleKeyDown}
                handleNicknameUpdateChange={handleNicknameUpdateChange}
                member={member}
              />
          </Form>
            </Card.Title>
            <LogoutForm />
            
          </Col>
          <Col xs={8}>
            <Row>
              <Col
                xs={3}
                style={{
                  fontSize: "14px",
                  padding: "0px",
                  textAlign: "center",
                }}
              >
                다정 온도
              </Col>
              <Col xs={9}>
                <div className="d-flex flex-column align-items-center">
                  <ProgressBar
                    now={profile.dajungScore}
                    style={{ width: "100%", height: "1rem"}}
                  ><div
                  style={{
                    background:"#ff8787",
                    width: `${profile.dajungScore}%`,
                    height: `100%`
                  }}
                  ></div></ProgressBar>
                  <div>{dajungTemperature}</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                소개
              </Col>
            </Row>
            <Row style={{minHeight:"20%"}}>
              <Col xs={12} style={{border: "2px solid #91A7FF", borderRadius:"7px"}}>{profile.profileIntro}</Col>
            </Row>
            {toId !== fromId && (
              <Row>
                <Col xs={12}>
                  <Button style={{ width: "49%" }}>그룹채팅방 초대</Button>
                  <Button style={{ width: "51%" }}>1대1채팅방 초대</Button>
                </Col>
              </Row>
            )}
          </Col>
          <Col xs={12}>
            <hr style={{border: "1px solid #91A7FF"}} />
          </Col>
        </Row>
        <ProfileStats
          toId={toId}
          feeds={feeds}
          buildingSubscriptionCount={buildingSubscriptionCount}
          followerCount={followerCount}
          followingCount={followingCount}
        />

        <ProfileActions toId={toId} fromId={fromId} />
      </Card.Body>
    </Card>
  );
};

export default ProfileBody;
