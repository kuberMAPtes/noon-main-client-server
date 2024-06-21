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