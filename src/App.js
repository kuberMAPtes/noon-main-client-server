import logo from "./logo.svg";
import "./App.css";
import ChatTest from "./pages/Chat/Chat_TEST";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <Routes>
      <AppRoutes/>
      <Route path="/" element={<ChatTest />} />
    </Routes>
  );
}

export default App;
