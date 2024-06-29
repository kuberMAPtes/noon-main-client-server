import React, { useEffect, useState, useRef } from 'react';
import Footer from '../../components/common/Footer';
import '../CustomerSupport/css/customerSupport.css';
import axiosInstance from '../../lib/axiosInstance';
import Header from '../../components/common/Header';

const GetChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'response', text: '안녕하세요 NOON챗봇이에요! 무엇을 도와드릴까요?', timestamp: '' }
  ]); 

  const [userQuestion, setUserQuestion] = useState('');
  const [questionTimeNDate, setQuestionTimeNDate] = useState('');

  const chatBodyRef = useRef(null);

  //질문 보내고 응답 받기                             
  const getChatbotConversation = async (e) => {
    try {
      const currentTime = new Date().toISOString();
      const newMessage = { id: messages.length + 1, type: 'question', text: userQuestion, timestamp: currentTime };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      console.log(newMessage);
      
      const response = await axiosInstance.post(`/customersupport/getChatbotConversation`, {
        userQuestion : userQuestion,
        questionTimeNDate : questionTimeNDate
      });
      console.log("질문 및 응답 결과: "+JSON.stringify(response.data));

      const serverResponse = { id: messages.length + 2, type: 'response', text: response.data.chatbotAnswer, timestamp: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, serverResponse]);
      setUserQuestion('');

    } catch (error) {
      console.error("Error fetching ChatbotConversation details:", error);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <Header title="NOON 챗봇" />
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map(message => (
          <div key={message.id} className={`chat-message ${message.type}`}>
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input 
          type="text" 
          value={userQuestion} 
          onChange={(e) =>  setUserQuestion(e.target.value)} 
          placeholder="질문을 입력하세요" 
        />
        <button onClick={getChatbotConversation}>전송</button>
      </div>
      <Footer/>
    </div>
  );
};

export default GetChatbot;
