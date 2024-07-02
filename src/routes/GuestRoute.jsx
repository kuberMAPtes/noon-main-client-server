import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { encryptWithLv } from '../util/crypto';
import { setIsRedirect } from '../redux/slices/authSlice';
import { navigateMainPage, navigateRealMainPage } from '../util/mainPageUri';
import useFooterToggle from '../components/hook/useFooterToggle';

//게스트만 사용할 수 있는 라우터
const GuestRoute = ({ children }) => {
    
    const authorization = useSelector((state) => state.auth.authorization);
    const member = useSelector((state) => state.auth.member);
    const isRedirect = useSelector((state) => state.auth.isRedirect);
    const loading = useSelector((state) => state.auth.loading);//AuthLoader가 비동기요청을 처리한 후 > false
    //동적URI가 필요
    // const [uri, setUri] = useState(null);
    //초기화될때는 return 하면 안되고, AuthLoader의 useEffect가 끝난 후에 return해야함
    const [IsFirst, setIsFirst] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    console.log("#### GuestRoute 렌더링 authorization, memberId, uri, IsFirst구독", authorization, member,IsFirst);
    //부작용 로직이다. 렌더링은 UI에 집중하고 부작용은 useEffect에 집중
    useEffect(() => {
        console.log("@@@@ GuestRoute useEffect 시작")
        if (authorization && member&& member?.memberId && isRedirect) {
            // alert("로그인한 사용자는 입장이 안됩니다.(리다이렉트를 false로..)"+authorization+"::"+memberId+"::"+isRedirect);
            // navigateMainPage(member?.memberId,navigate);
            navigateRealMainPage(navigate);
            // const { encryptedData, ivData } = encryptWithLv(memberId);
            // const encryptedToId = encodeURIComponent(encryptedData);
            // const IV = encodeURIComponent(ivData);
            // const generatedUri = `${process.env.REACT_APP_MAIN_PAGE_URI}/${encryptedToId}/${IV}`;
            // uri=generatedUri;
            dispatch(setIsRedirect(false));
        }
        setIsFirst(false);
    }, [authorization, member, isRedirect, navigate, dispatch]);

    if (IsFirst === true || loading === true) {
      return null;
    } else {
        return <>{children}</>;
    }
};

export default GuestRoute;
