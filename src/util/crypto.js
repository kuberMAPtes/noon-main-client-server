import CryptoJS from 'crypto-js';

const passphrase = process.env.REACT_APP_CRYPTO_SECRET_KEY;
// AES 암호화 함수
export const encryptWithLv = (data) => {
    const key = CryptoJS.enc.Utf8.parse(passphrase);
    const iv = CryptoJS.lib.WordArray.random(16); // 16 바이트 길이의 랜덤 iv 생성
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return {
        encryptedData: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
        ivData: iv.toString(CryptoJS.enc.Base64)
    };
};
// AES 복호화 함수
export const decryptWithLv = (encryptedData, ivData) => {
    const key = CryptoJS.enc.Utf8.parse(passphrase);
    const iv = CryptoJS.enc.Base64.parse(ivData);
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypted);
};
//
// URI 인코딩을 포함한 AES 암호화 함수
export const encryptWithLvWithUri = (data) => {
  const { encryptedData, ivData } = encryptWithLv(data);
  return {
      encryptedData: encodeURIComponent(encryptedData),
      ivData: encodeURIComponent(ivData)
  };
};
// URI 디코딩을 포함한 AES 복호화 함수
export const decryptWithLvWithUri = (encryptedData, ivData) => {
  return decryptWithLv(decodeURIComponent(encryptedData), decodeURIComponent(ivData));
};

export const generateNavigateUrl = async (memberId) => {
  try {
    const encryptionPromise = new Promise((resolve, reject) => {
      try {
        const { encryptedData, ivData } = encryptWithLv(memberId);
        resolve({ encryptedData, ivData });
      } catch (error) {
        reject(error);
      }
    });

    const { encryptedData, ivData } = await encryptionPromise;

    const secretId = encodeURIComponent(encryptedData);
    const secretIv = encodeURIComponent(ivData);
    const mainPageUri = process.env.REACT_APP_MAIN_PAGE_URI || '/member/getMemberProfile';

    console.log("네비게이트하기전 확인 :: uri인코딩,암호화된멤버아이디",
      secretId, "uri인코딩,암호화된Iv",
      secretIv, "메인페이지URI",
      mainPageUri);

    const navigateUri = `${mainPageUri}/${secretId}/${secretIv}`;
    return navigateUri;
  } catch (error) {
    console.error("암호화 처리 중 오류 발생:", error);
    return null;
  }
};