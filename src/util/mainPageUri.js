import { encryptWithLv } from "./crypto";

export const navigateMainPage = (memberId,navigate) => {
    // alert("memberID :: " + memberId);
    const {encryptedData,ivData} = encryptWithLv(memberId);
    const secretId = encodeURIComponent(encryptedData);
    const secretIv = encodeURIComponent(ivData);
    const mainPageUri = process.env.REACT_APP_MAIN_PAGE_URI
    console.log("네비게이트하기전 확인 :: uri인코딩,암호화된멤버아이디"
        , secretId
        ,"uri인코딩,암호화된Iv"
        ,secretIv
        ,"메인페이지URI"
        ,mainPageUri);

    const navigateUri = `${mainPageUri}/${secretId}/${secretIv}`;
    // alert("네비게이트할 URI :: " + navigateUri);
    navigate(navigateUri);
}