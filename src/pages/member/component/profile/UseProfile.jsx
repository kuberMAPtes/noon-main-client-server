import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getMemberProfile } from "../../function/memberAxios";
import useGetInitialPage from "../hook/useGetInitialPage";
import useDecryptId from "../hook/useDecryptId";

const UseProfile = () => {
  const { initialPage } = useGetInitialPage();
  const { toId } = useDecryptId();
  const fromId = useSelector((state) => state.auth.member.memberId);

  const authorization = useSelector((state) => state.auth.authorization);

  const [profile, setProfile] = useState({
    dajungScore: 0,
    profilePhotoUrl: "",
    profileIntro: "",
    nickname: "",
    feedDtoList: [],
  });

  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    if (authorization && fromId && toId) {
      console.log(
        "Fetching member profile data",
        "Authorization:",
        authorization,
        "From ID:",
        fromId,
        "To ID:",
        toId
      );

      const fetchMemberProfile = async () => {
        const response = await getMemberProfile(fromId, toId); //관계를 다 따져볼거임. info에 뭐가 있을까...
        // alert("fetchMemberProfile"+JSON.stringify(response));
        if (response?.memberId) {
          //   alert("setIsDenied false");
          setIsDenied(false);
        } else {
          // alert("setIsDenied true");
          setIsDenied(true);
        }
        console.log("Profile data:", response);
        setProfile(response);
      };

      fetchMemberProfile();
    }
  }, [authorization, toId, fromId, isDenied]);

  return { profile, setProfile, toId, fromId, initialPage, isDenied };
};

export default UseProfile;
