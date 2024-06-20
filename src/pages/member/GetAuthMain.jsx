import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setMember } from '../../redux/slices/authSlice';
import styles from '../../assets/css/module/member/GetAuthMain.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { checkRedirectResult } from './function/googleLogin';
import LoginButtons from './component/LoginButtons';
import BackgroundTemplate from '../../components/common/BackgroundTemplate';
import ForegroundTemplate from '../../components/common/ForegroundTemplate';
import NoonLogo from '../../assets/css/NoonLogo';
const GetAuthMain = () => {
  console.log("#### GetAuthMain 컴포넌트 초기화 시작");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.auth.loginError);
  
  const handleLoginClick = () => {
    console.log("$$$$ 일반 로그인 버튼 클릭");
    navigate('/member/loginForm');
  };

  useEffect(() => {
    console.log("@@@@ GetAuthMain useEffect - checkRedirectResult 호출");
    console.log(`loginError`, loginError);
    const getResult = async () => {
      console.log("$$$$ getResult 함수 시작");
      const response = await checkRedirectResult(dispatch);
      console.log("checkRedirectResult 결과:", response);//여기는 토큰과 유저가 온다.
      const info = response?.user;
      const token = response?.token;
      if (info?.email && info?.email !== "") {
        const loginData = {
            member : {
                authorizeCode: token
                ,memberId: info?.email
                ,nickname: info?.displayName
                ,profilePhotoUrl: info?.photoURL
                ,phoneNumber: info?.phoneNumber
            }
            ,loginWay: "google"
        }
        //   dispatch(setMember(response));
        console.log("$$$$ 구글 로그인 시도");
        dispatch(login({ loginData, navigate }));
      }
    };
    getResult();
  }, [dispatch]);

  return (
    <ForegroundTemplate>
      <Container className={`mt-5 ${styles.container}`}>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <LoginButtons onLoginClick={handleLoginClick} />
          </Col>
        </Row>
      </Container>
    </ForegroundTemplate>
  );
};

export default GetAuthMain;
