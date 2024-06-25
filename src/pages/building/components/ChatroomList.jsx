import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  useEffect(() => {
    getChatroomList();
  }, [buildingId]);

  return (
    <div className="chatroom-list">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>채팅방 목록</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>채팅방 이름&nbsp;&emsp;&emsp;&emsp;&emsp;</th>
                    <th>입장 최소 다정온도</th>
                  </tr>
                </thead>
                <tbody>
                  {chatroomList.map((chatroom) => (
                    <tr key={chatroom.chatroomId}>
                      <td>{chatroom.chatroomName}</td>
                      <td>{chatroom.chatroomMinTemp}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChatroomList;
