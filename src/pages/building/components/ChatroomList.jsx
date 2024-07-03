import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../lib/axiosInstance';
import '../../feed/css/common/FeedNotFound.css';

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
    navigate('../../chat/chatroom?chatroomID=' + chatroomID);
  }

  useEffect(() => {
    getChatroomList();
  }, [buildingId]);

  return (
    <div className="chatroom-list" style={{ marginBottom: '100px' }}>

      {chatroomList && chatroomList.length > 0 ? (
        <>
          <div className='chatroom-title' style={{
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'inherit'
          }}>
            <i className="fa-solid fa-comments" /> 채팅방 목록
          </div>

          {chatroomList.map((chatroom) => (
            <Card key={chatroom.chatroomID} style={{ marginTop: '20px' }}>
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
          ))}
        </>
      ) : (

        <div className="not-found-container">
          <h1 className='not-found-title'><FcAbout /> </h1>
          <h1 className="not-found-title">채팅방이 없습니다!</h1>
          <p className="not-found-message">새로운 채팅방을 만들어보세요 :D</p>
        </div>

      )}

    </div>
  );
};

export default ChatroomList;
