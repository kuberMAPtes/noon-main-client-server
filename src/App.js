import ChatRoomCreation from "./pages/Chat/ChatroomCreation";
import Chatroom from "./pages/Chat/Chatroom";
import MyChatroomList from "./pages/Chat/MyChatroomList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatRoomCreation />} />
      <Route path="/chatroom" element={<Chatroom />} />
      <Route path="/myChatroomList" element={<MyChatroomList />} />
    </Routes>
  );
}

export default App;
