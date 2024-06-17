import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { getCookie } from '../../util/cookies';
import { decryptWithIv } from '../../util/crypto';

const KakaoNav = () => {
    console.log('#### KakaoNav 컴포넌트 시작');
    const StoreMemberId = useSelector((state) => state.auth.member.memberId);
    const [loginWay,setLoginWay] = useState(null);
    const loginWayValue = 'kakao';
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("@@@@ KakaoNav useEffect1 시작")
        const searchParams = new URLSearchParams(location.search);
        setLoginWay(searchParams.get('loginWay'));
    },[loginWay]);

    useEffect(() => {
        console.log(`@@@@ KakaoNav useEffect2 시작`);
        let encryptedMemberId = getCookie("Member-ID");
        let IV = getCookie("IV");
        let memberId;

        if (encryptedMemberId !== null && IV !== null) {
            memberId = decryptWithIv(encryptedMemberId,IV);
        }

        console.log("암호화된 멤버ID :: "+encryptedMemberId);
        console.log("암호화 해제한 멤버ID"+memberId);
        console.log("암호화된 IV :: "+IV);
        console.log('loginWay:', loginWay);
        console.log('encryptedMemberId:', encryptedMemberId);
        console.log('memberId:', memberId)

        if (loginWay === loginWayValue && memberId) {
        // 로그인 데이터 준비
            const loginData = {
                member : {memberId: memberId},
                loginWay: loginWay
            };
            console.log("정상적으로 로그인 데이터 준비 완료", loginData)
            // 로그인 함수 디스패치
            
        // 비동기 로그인 함수 호출
            const performLogin = async () => {
                await dispatch(login({ loginData, navigate }));
            };
  
            performLogin();
        }

    
    }, [dispatch, navigate,StoreMemberId,loginWay]);

  return null;
};

export default KakaoNav;
