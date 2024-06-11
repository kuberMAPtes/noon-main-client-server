import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authSlice";

const LoginForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [memberId, setMemberId] = useState("");
  const [pwd, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { memberId, pwd };
    try {
      console.log("auth :: ", auth); // store에 저장된 상태를 로그에 출력
      await dispatch(login(loginData)).unwrap();
      console.log("auth :: ", auth); // store에 저장된 상태를 로그에 출력
      navigate("/member/getMemberProfile"); // 로그인 성공 시 GetMemberProfile로 이동
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

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
