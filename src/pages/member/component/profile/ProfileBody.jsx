import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  ProgressBar,
  Button,
  Form,
} from "react-bootstrap";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";
import LogoutForm from "../LogoutForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useEncryptId from "../../hook/useEncryptId";
import NormalButton from "../NormalButton";
import module from "../../../../assets/css/module/member/GetMemberProfile.module.css";
import useMainPage from "../../hook/useMainPage";
import NicknameInput from "../NicknameInput";
import {
  handleNicknameUpdateChange,
  handleProfileIntroUpdateChange,
} from "../../function/AddUpdateMemberUtil";
import ProfilePhotoInput from "../ProfilePhotoInput";
import { updateProfilePhotoUrl } from "../../function/memberAxios";
import ProfileIntroInput from "../ProfileIntroInput";
import DajungScore from "./DajungScore";
import { FaPen } from "react-icons/fa6";
//4가지 파라미터 다 WAS에서 받아야함
//> setProfile등등..필요
//> 상위컴포넌트의 커스텀 훅에서 하고 여기서는 받아쓰자.
const ProfileBody = ({
  toId,
  fromId,
  profile,
  setProfile,
  feeds,
  buildingSubscriptionCount,
  followerCount,
  followingCount,
}) => {
  // const [dajungTemperature, setDajungTemperature] = useState("");
  const defaultPhotoUrl = `${process.env.PUBLIC_URL}/image/defaultMemberProfilePhoto.png`;
  // const member = useSelector((state) => state.auth.member);
  // const mainPageUrl = useMainPage(member.memberId);
  const [nickname, setNickname] = useState(profile?.nickname);
  const [nicknameValidationMessage, setNicknameValidationMessage] =
    useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  const [profileIntro, setProfileIntro] = useState(profile?.profileIntro);
  const [profileIntroValidationMessage, setProfileIntroValidationMessage] =
    useState("");
  const [isProfileIntroValid, setIsProfileIntroValid] = useState(false);

  const handleImageError = (e) => {
    e.target.src = defaultPhotoUrl;
  };

  const handleImageUpload = async (file) => {
    try {
      const updatedProfilePhotoUrl = await updateProfilePhotoUrl(toId, file);
      // 여기서 상태를 업데이트하여 새로운 프로필 사진 URL을 반영합니다.
      console.log("업로드된 파일 URL:", updatedProfilePhotoUrl);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  useEffect(() => {
    setNickname(profile?.nickname);
  }, [profile?.nickname]);

  useEffect(() => {
    setProfileIntro(profile?.profileIntro);
  }, [profile?.profileIntro]);

  // useEffect(() => {
  //   if (profile.dajungScore >= 80) {
  //     setDajungTemperature("매우 따뜻함");
  //   } else if (profile.dajungScore >= 60) {
  //     setDajungTemperature("따뜻함");
  //   } else if (profile.dajungScore >= 40) {
  //     setDajungTemperature("보통");
  //   } else if (profile.dajungScore >= 20) {
  //     setDajungTemperature("차가움");
  //   } else {
  //     setDajungTemperature("매우 차가움");
  //   }
  // }, [profile.dajungScore]);

  if (!profile?.nickname) {
    return null;
  }

  return (
    <Card style={{ position: "relative" }}>
      <Card.Body style={{ border: "2px solid #91A7FF", borderRadius: "7px",padding:"0%",width:"100%",height:"100%" }}>
          <div
            xs={2}
            className="d-flex justify-content-start"
            style={{ position: "absolute", left: 0, top: 0, padding: 0 }}
          >
            <LogoutForm />
          </div>

        <Row className="mb-3 align-items-start" style={{margin:"0%"}}>
          <Row style={{width:"30%", height: "30%", margin:"0%",padding:"10% 0% 0% 0%"}}>
          {toId !== fromId ? (
            <Col
              xs={12}
              className="d-flex flex-column align-items-center"
              style={{ margin: "0px",padding:"0%" }}
            >
              <Image
                src={profile.profilePhotoUrl || defaultPhotoUrl}
                roundedCircle
                className={`mb-3 ${module.fixedMargin} ${module.profilePhoto}`}
                style={{ textAlign: "center" }}
                onError={handleImageError}
              />
            </Col>
          ) : (
            <Col
              xs={12}
              className="d-flex flex-column align-items-center"
              style={{ margin: "0px",padding:"0%" }}
            >
              <ProfilePhotoInput
                profile={profile}
                defaultPhotoUrl={defaultPhotoUrl}
                handleImageUpload={handleImageUpload}
              />
            </Col>
          )}
          <Col xs={12}>
            <Card.Title>
              {toId === fromId ? (
                <Form>
                  <NicknameInput
                    nickname={nickname}
                    setNickname={setNickname}
                    nicknameValidationMessage={nicknameValidationMessage}
                    setNicknameValidationMessage={setNicknameValidationMessage}
                    isNicknameValid={isNicknameValid}
                    setIsNicknameValid={setIsNicknameValid}
                    // mainPageUrl={mainPageUrl}
                    handleNicknameUpdateChange={handleNicknameUpdateChange}
                    toId={toId}
                    profile={profile}
                    setProfile={setProfile}
                  />
                </Form>
              ) : (
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {profile.nickname}
                </div>
              )}
            </Card.Title>
          </Col>
          </Row>

          <Row style={{width:"70%",height: "30%", margin:"0%",padding:"13% 0% 0% 0%"}}>
            <Col xs={12}>
              <DajungScore
                profile={profile}
                setProfile={setProfile}
                toId={toId}
                fromId={fromId}
              />
            </Col>
            <Col xs={12} style={{fontWeight:900,fontSize:"13px"}}> <FaPen style={{ fontSize: "10px" }} />&nbsp;&nbsp;프로필 소개</Col>
            {toId===fromId ?
            <Row style={{ minHeight: "20%" }}>
              {/* <Col xs={12} style={{border: "2px solid #91A7FF", borderRadius:"7px"}}>&nbsp;{profile.profileIntro}</Col> */}
              <Form>
                <ProfileIntroInput
                  profileIntro={profileIntro}
                  setProfileIntro={setProfileIntro}
                  profileIntroValidationMessage={profileIntroValidationMessage}
                  setProfileIntroValidationMessage={
                    setProfileIntroValidationMessage
                  }
                  isProfileIntroValid={isProfileIntroValid}
                  setIsProfileIntroValid={setIsProfileIntroValid}
                  handleProfileIntroUpdateChange={
                    handleProfileIntroUpdateChange
                  }
                  toId={toId}
                  profile={profile}
                  setProfile={setProfile}
                />
              </Form>
            </Row>
            :
            <Row style={{ minHeight: "20%" }}>
              <Col
                xs={12}
                style={{ border: "2px solid #91A7FF", borderRadius: "7px" }}
              >
                &nbsp;{profile.profileIntro}
              </Col>
            </Row>
            }
          </Row>
            

          <Col xs={12}>
            <hr style={{ border: "1px solid #91A7FF" }} />
          </Col>
        </Row>
        <ProfileStats
          toId={toId}
          feeds={profile.feedDtoList}
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
