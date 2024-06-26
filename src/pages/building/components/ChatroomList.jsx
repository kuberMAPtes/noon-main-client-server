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
      <Row>
        <Col md="12">
          <Card style={{ marginBottom: '80px' }}>
            <CardHeader>
              <CardTitle>채팅방 목록</CardTitle>
            </CardHeader>

            {chatroomList.map((chatroom) => (
            <Card>
              <CardBody>
              <Table responsive>
                  <tbody >
                      <tr key={chatroom.chatroomID} onClick={()=>handleChatroom(chatroom.chatroomID)}>
                        <td><b style={{ fontSize: '25px'}}>{chatroom.chatroomName}</b></td>
                        <td style={{  textAlign: 'right' }}> 최소 온도&nbsp;<b style={{ fontSize: '30px'}}>&nbsp;{chatroom.chatroomMinTemp}</b></td>
                      </tr>
                  </tbody>
                  </Table>
              </CardBody>
            </Card>
            ))}

          </Card >
          

          



        </Col>
      </Row>
    </div>
  );
};

export default ChatroomList;
