import React, { useState } from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';
import '../CustomerSupport/css/customerSupport.css';
import axiosInstance from '../../lib/axiosInstance';

const GetChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'response', text: '안녕하세요 NOON챗봇이에요! 무엇을 도와드릴까요?', timestamp: new Date().toISOString() }
  ]); 

  const [userQuestion, setUserQuestion] = useState('');
  const [questionTimeNDate, setQuestionTimeNDate] = useState('');

  // 날짜와 시간을 YYYY-MM-DD \n X시 X분 X초 형식으로 포맷하는 함수
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedTime = date.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    return `${formattedDate} \n ${formattedTime}`;
  };

  // 질문 보내고 응답 받기                             
  const getChatbotConversation = async () => {
    try {
      const currentTime = new Date().toISOString();
      const newMessage = { id: messages.length + 1, type: 'question', text: userQuestion, timestamp: currentTime };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      console.log(newMessage);
      
      const response = await axiosInstance.post(`/customersupport/getChatbotConversation`, {
        userQuestion: userQuestion,
        questionTimeNDate: currentTime
      });
      console.log("질문 및 응답 결과: " + JSON.stringify(response.data));

      const serverResponse = { id: messages.length + 2, type: 'response', text: response.data.chatbotAnswer, timestamp: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, serverResponse]);
      setUserQuestion('');

    } catch (error) {
      console.error("Error fetching ChatbotConversation details:", error);
    }
  };

  return (
    <div className="chat-container">
      <CustomerSupportHeader title="NOON 챗봇" />
      <div className="chat-container">
        <div className="chat-body">
          {messages.map(message => (
            <div key={message.id} className={`chat-message ${message.type}`}>
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{formatDate(message.timestamp)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <input 
          type="text" 
          value={userQuestion} 
          onChange={(e) => setUserQuestion(e.target.value)} 
          placeholder="질문을 입력하세요" 
        />
        <button onClick={getChatbotConversation}><i class="fa-solid fa-comment"></i></button>
      </div>
      <Footer />
    </div>
  );
};

export default GetChatbot;
