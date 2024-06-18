import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { encryptWithLv } from '../util/crypto';

//게스트만 사용할 수 있는 라우터
const GuestRoute = ({ children }) => {
    
    const authorization = useSelector((state) => state.auth.authorization);
    const memberId = useSelector((state) => state.auth.member.memberId);
    //동적URI가 필요
    const [uri, setUri] = useState(null);
    //초기화될때는 return 하면 안되고, AuthLoader의 useEffect가 끝난 후에 return해야함
    const [IsFirst, setIsFirst] = useState(true);
    
    console.log("#### GuestRoute 렌더링 authorization, memberId, uri, IsFirst구독", authorization, memberId, uri, IsFirst);
    //부작용 로직이다. 렌더링은 UI에 집중하고 부작용은 useEffect에 집중
    useEffect(() => {
        console.log("@@@@ GuestRoute useEffect 시작")
        if (authorization && memberId) {
            const { encryptedData, ivData } = encryptWithLv(memberId);
            const encryptedToId = encodeURIComponent(encryptedData);
            const IV = encodeURIComponent(ivData);
            const generatedUri = `${process.env.REACT_APP_MAIN_PAGE_URI}/${encryptedToId}/${IV}`;
            setUri(generatedUri);
        }
        setIsFirst(false);
    }, [authorization, memberId]);

    if (IsFirst){
        return null;
    }

    //조건부 렌더링 : 인증이 있으면 메인페이지로 강제로 이동 
    return authorization ? (
        <Navigate to={uri} />

    ) : (
        <>
            {children}
        </>
    );
};

export default GuestRoute;
