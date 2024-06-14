import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authSlice";

const LoginForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeMemberId = useSelector((state) => state.auth.member.memberId);
  const [memberId, setMemberId] = useState("");
  const [pwd, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { memberId, pwd };
    try {
      console.log("로그인 하기전 store.auth.member :: ", memberId); // store에 저장된 상태를 로그에 출력
      const { member } = await dispatch(login(loginData)).unwrap();
      console.log("멤버 :: ", member);
      console.log("로그인 한 후 store.auth.member :: ", member);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  useEffect(() => {
    console.log("store.auth.member.memberId :: ", storeMemberId); // store에 저장된 상태를 로그에 출력
    if (storeMemberId) {//truthy할때만 실행
      const toId = storeMemberId;
      console.log("toId: ", toId);
      const navigateUri = `/member/getMemberProfile/${toId}`;
      navigate(navigateUri); // 로그인 성공 시 GetMemberProfile로 이동
    }
  }, [storeMemberId, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="memberId">Member ID:</label>
        <input
          type="text"
          id="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="pwd"
          value={pwd}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;