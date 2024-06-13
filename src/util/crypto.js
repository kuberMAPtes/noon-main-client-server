import CryptoJS from 'crypto-js';

// 암호화 키는 외부에 노출되지 않도록 환경 변수 등에서 관리합니다.
const SECRET_KEY = process.env.REACT_APP_CRYPTO_SECRET_KEY;

// 암호화 함수
export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// 복호화 함수
export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
