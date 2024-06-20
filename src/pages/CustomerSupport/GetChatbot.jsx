import React from 'react';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const GetChatbot = () => {
  return (
    <div className="customer-support-chat">

      <CustomerSupportHeader title="NOON Chatbot" />

      <div className="chat-container">
        <div className="chat-messages">
          <div className="message received">
            <span>운영중인가요?</span>
            <div className="message-time">2024-05-20 17:36:19</div>
          </div>
          <div className="message sent">
            <span>지금 영업중입니다. 영업시간은 09:00~18:00입니다.</span>
            <div className="message-time">2024-05-20 17:36:19</div>
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="질문을 입력하세요" />
          <button>전송</button>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default GetChatbot;
