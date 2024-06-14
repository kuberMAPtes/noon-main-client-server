import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import { encryptWithLv } from '../util/crypto';


//getAuthMain과 같은 컴포넌트를 감싼다. 로그인한 사용자가 접근하지 못하도록 하는 컴포넌트
const GuestRoute = ({ children }) => {
    console.log("####GuestRoute 렌더링");

    const authorization = useSelector((state) => state.auth.authorization);
    const memberId = useStore().getState().auth.member.memberId;
    const {encryptedData,ivData} = encryptWithLv(memberId);
    console.log("memberId :: "+memberId);
    console.log("encryptedMemberId :: "+encryptedData);
    const encryptedToId = encodeURIComponent(encryptedData);
    const IV = encodeURIComponent(ivData);
    console.log("encryptedToId :: "+encryptedToId);
    console.log("IV :: "+IV);
    const [loading, setLoading] = useState(false);
    //프로필로 이동시킨다.
    const uri = `${process.env.REACT_APP_MAIN_PAGE_URI}/${encryptedToId}/${IV}`;

    useEffect(() => {
        console.log("@@@@GuestRoute useEffect 실행");
        console.log("authorization :: "+authorization);
        if(authorization){
            setLoading(true);
            console.log("uri :: "+uri);
        }
    }, [authorization,uri,setLoading]);

    if(loading) {
        return <div>Loading...</div>;
    } else {
        return authorization ? (
            <Navigate to={uri} />
          ) : (
            <>
              {children}
            </>
        )
    }
};

export default GuestRoute;
