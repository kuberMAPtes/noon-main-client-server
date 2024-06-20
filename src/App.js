
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthLoader from "./components/common/AuthLoader";
import "./App.css";
import {useEffect} from "react";
function App() {

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      useEffect(() => {
        setScreenSize();
      });

  return (
    <AuthLoader>
      <AppRoutes />
    </AuthLoader>
  );
}

export default App;
