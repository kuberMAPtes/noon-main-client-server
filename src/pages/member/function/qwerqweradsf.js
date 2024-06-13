import React, { useEffect, useState } from "react";
import { initializeFirebase } from "../firebase";
import {
  setupAuthStateListener,
  handleRedirectResult,
  handleRedirectGoogleLogin,
} from "../authHelpers";

const Home = () => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    initializeFirebase().then((authInstance) => {
      setAuth(authInstance);
      authInstance.languageCode = "ko";

      const unsubscribe = setupAuthStateListener(authInstance, setUser);
      return () => unsubscribe();
    });
  }, []);

  useEffect(() => {
    if (auth) {
      handleRedirectResult(auth, setUser);
    }
  }, [auth]);

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => handleRedirectGoogleLogin(auth)}>구글로그인</button>
      {user && (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
