import ChatRoomCreation from "./pages/Chat/ChatroomCreation";
import Chatroom from "./pages/Chat/Chatroom";
import MyChatroomList from "./pages/Chat/MyChatroomList";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<ChatTest />} /> */}
        <Route path="/" element={<ChatRoomCreation />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/myChatroomList" element={<MyChatroomList />} />
      </Routes>
      <AppRoutes />
    </div>
  );
}

export default App;
