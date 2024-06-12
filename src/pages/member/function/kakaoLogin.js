export const handleKakaoLogin = () => {
    console.log('카카오 로그인 버튼 클릭');
    const redirectUri = process.env.REACT_APP_API_BASE_URL + '/member/kakaoLogin';
    console.log('redirectUri :: ', redirectUri);
    const encodedUri = encodeURIComponent(redirectUri);
    console.log(encodedUri);
    const clientId = process.env.REACT_APP_KAKAO_API_KEY;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedUri}`;
  };