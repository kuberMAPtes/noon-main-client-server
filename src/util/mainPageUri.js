import { encryptWithLv } from "./crypto";

// export const navigateMainPage = async (memberId, navigate) => {
  export const navigateMainPage = (memberId, navigate) => {
    try {
        // // 암호화 작업을 비동기로 처리
        // const encryptionPromise = new Promise((resolve, reject) => {
        //     try {
        //         const { encryptedData, ivData } = encryptWithLv(memberId);
        //         resolve({ encryptedData, ivData });
        //     } catch (error) {
        //         reject(error);
        //     }
        // });

        // const { encryptedData, ivData } = await encryptionPromise;
        const { encryptedData, ivData } = encryptWithLv(memberId);
        const secretId = encodeURIComponent(encryptedData);
        const secretIv = encodeURIComponent(ivData);
        const mainPageUri = process.env.REACT_APP_MAIN_PAGE_URI;

        console.log("네비게이트하기전 확인 :: uri인코딩,암호화된멤버아이디",
            secretId, "uri인코딩,암호화된Iv",
            secretIv, "메인페이지URI",
            mainPageUri);

        const navigateUri = `${mainPageUri}/${secretId}/${secretIv}?`;
        // alert("네비게이트URI:" + navigateUri);
        navigate(navigateUri);
    } catch (error) {
        console.error("암호화 처리 중 오류 발생:", error);
    }
}
