// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWydiBD9tDhnzRYD0iXOxtYnDI6Yjzi00",
  authDomain: "phonenumberproject-424505.firebaseapp.com",
  projectId: "phonenumberproject-424505",
  storageBucket: "phonenumberproject-424505.appspot.com",
  messagingSenderId: "772175199952",
  appId: "1:772175199952:web:1f696acacd4cc7dc4868d5",
};
let firebaseApp = null;
let firebaseAuth = null;
// Initialize Firebase
// 초기화 후에 인증을 사용해야하는데 await를 하지 않으면 auth가 undefined가 될 수 있음.(동기화 문제)
async function initializeFirebase() {
    if (!firebaseApp) {
      firebaseApp = initializeApp(firebaseConfig);
      firebaseAuth = getAuth(firebaseApp);
    }
    return firebaseAuth;
  }

initializeFirebase().then((auth) => {
  // You can now safely access auth
  console.log("Firebase Auth가 초기화 되었다! : ", auth);
});
export { initializeFirebase };
