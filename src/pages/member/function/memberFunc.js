// Cookies.set("token", JSON.stringify(member), { expires: 1 });
import Cookies from "js-cookie";


export const setTokenCookie = (member) => {
    console.log("쿠키를 세팅합니다 :: ", member);
    // member = {
    //     memberId: 'member_100',
    //     memberRole: 'ADMIN',
    //     nickname: '특별한닝겐100',
    //     pwd: 'noon0716',
    //     phoneNumber: '010-4543-1545',
    //     unlockTime: '0101-01-01T01:01:01',
    //     profilePhotoUrl: 'data:image/webp;base64,UklGRj45AABXRUJQVlA4IDI5AA',
    //     profileIntro: '반가워나는관리자100',
    //     dajungScore: 5,
    //     signedOff: false,
    //     buildingSubscriptionPublicRange: 'PUBLIC',
    //     allFeedPublicRange: 'PUBLIC',
    //     memberProfilePublicRange: 'PRIVATE',
    //     receivingAllNotificationAllowed: true,
    //   };
    // console.log(JSON.stringify(member));
    // 쿠키 만료 날짜 설정 (예: 7일 후)
    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + parseInt(process.env.REACT_APP_COOKIE_EXPIRE_TIME));

    // 쿠키 설정
    console.log("쿠키를 세팅하려고합니다");
    Cookies.set('AuthToken', JSON.stringify(member), {
        expires: expiresDate,
        path: '/',
        secure: false, // HTTPS 연결이 아닌 경우에도 쿠키 전송 허용
        // HttpOnly 옵션은 js-cookie 라이브러리로 설정할 수 없음 (서버 측에서 설정 필요)
    });
    console.log("만약 쿠키에 데이터가 너무 많다면 쿠키를세팅했습니다 메세지가 뜨지 않고 세팅이 안됩니다.");
    console.log("쿠키를 세팅했습니다 :: ", document.cookie);
}   

export const clearAllCookies = () => {
  const cookies = document.cookie.split("; ");
  cookies.forEach(cookie => {
    const name = cookie.split("=")[0];
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  console.log("모든 쿠키 삭제 완료");
};

export const renderLoginError = (validationError, loginError) => {
    if (!validationError && loginError) {
      if (typeof loginError === "string") {
        return loginError;
      } else {
        if (loginError.loginWay && loginError.loginWay !== "normal") {
          return "소셜 로그인 계정으로는 일반 로그인을 할 수 없습니다.";
        }
        return (
          <>
            {loginError.message}
            {loginError.info && <div>{loginError.info}</div>}
          </>
        );
      }
    }
    return null;
  };