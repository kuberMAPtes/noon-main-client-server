import { Route, Routes, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthLoader from "./components/common/AuthLoader";
import "./App.css";
import "./assets/css/font.css";
import { useEffect } from "react";
import Footer from './components/common/Footer';
import BasicNavbar from './components/common/BasicNavbar';
import { useSelector } from "react-redux";

function App() {
  const footerEnabled = useSelector((state) => state.footerEnabled.value);

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <AuthLoader>
      {/* <BasicNavbar/> */}
        <AppRoutes />
      {footerEnabled && <Footer/>}
    </AuthLoader>
  );
}

export default App;
