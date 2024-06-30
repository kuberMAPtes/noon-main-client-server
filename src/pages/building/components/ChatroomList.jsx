import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../lib/axiosInstance';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { FcAbout } from 'react-icons/fc';

const ChatroomList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { buildingId } = useParams();
  const [chatroomList, setChatroomList] = useState([]);
  const navigate = useNavigate();

  // 건물 채팅방 목록 가져오기
  const getChatroomList = async () => {
    try {
      const response = await axiosInstance.get(`/buildingProfile/getBuildingChatroomList`, {
        params: { buildingId: buildingId }
      });
      setChatroomList(response.data);
      console.log("건물의 채팅방 목록: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching chatroom list:", error);
    }
  };

  const handleChatroom = async (chatroomID) => {
    navigate('../../chat/chatroom?chatroomID='+chatroomID)
  }

  useEffect(() => {
    getChatroomList();
  }, [buildingId]);

  return (
    <div className="chatroom-list">

      <Card style={{marginBottom:'100px'}}>
        <CardHeader>
          채팅방 목록
        </CardHeader>
        <CardBody>


        {chatroomList && chatroomList.length > 0 ? (
          chatroomList.map((chatroom) => (
            <Card key={chatroom.chatroomID}>
              <CardBody>
                <Table responsive>
                  <tbody>
                    <tr onClick={() => handleChatroom(chatroom.chatroomID)}>
                      <td><b style={{ fontSize: '20px' }}>{chatroom.chatroomName}</b></td>
                      <td style={{ textAlign: 'right' }}> 최소 온도&nbsp;<b style={{ fontSize: '25px' }}>&nbsp;{chatroom.chatroomMinTemp}</b></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          ))
        ) : (
            <div colSpan="2" style={{ textAlign: 'center', fontSize: '20px', padding: '20px'}}>
              <h3><FcAbout/> 아직 채팅방이 존재하지 않습니다!</h3> <br/>첫 번째 채팅방을 만들어보세요!
            </div>
        )}

        </CardBody>
      </Card>

    </div>
  );
};

export default ChatroomList;
