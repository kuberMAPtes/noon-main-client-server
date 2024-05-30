import ChatTest from "./pages/Chat/Chat_TEST";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatTest />} />
    </Routes>
  );
}

export default App;
