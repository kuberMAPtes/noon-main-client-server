import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { decryptWithLvWithUri } from '../../../../util/crypto';
import { getMemberProfile } from '../memberAxios';

const UseProfile = () => {

    const [searchParams] = useSearchParams();
    const {secretId, secretIv} = useParams();

    const authorization = useSelector((state) => state.auth.authorization);
    const fromId = useSelector((state) => state.auth.member.memberId);
    const [profile, setProfile] = useState(null);
    const [isDenied, setIsDenied] = useState(false);

    const initialPage = searchParams.get("page") || 1;
    const toId = decryptWithLvWithUri(secretId, secretIv);

    useEffect(() => {
        if (authorization && fromId && toId) {
          console.log("Fetching member profile data","Authorization:",authorization,"From ID:",fromId,"To ID:",toId);
          
          const fetchMemberProfile = async () => {
              const response = await getMemberProfile(fromId, toId);//관계를 다 따져볼거임. info에 뭐가 있을까...
              if(response?.memberId){
                setIsDenied(false);
              }else{
                setIsDenied(true);
              }
              console.log("Profile data:", response);
              setProfile(response);
          };

          fetchMemberProfile();
        }
    }, [authorization, toId, fromId, isDenied]);

    return {profile,toId,initialPage};
};

export default UseProfile;