import React, {useEffect} from 'react';


/////////////////////////////////////////
//////////////  미완성   //////////////// 
////////////////////////////////////////


const ActiveChatroomChecker = (socketRef, roomInfo) => {

    console.log("⏰활발한거 체크합니다");

    const chatroomActivityThreshold = 60; // 일정 시간 동안 채팅 메시지 수 임계값
    const activityCheckInterval = 60000; // 활동 체크 간격 (1분)
    var currentMessageCount = 0;

    let timerId;
    
    const startActivityMonitoring = () => {

        socketRef.current.emit("msg_history", roomInfo, (messageHistory)=>{
            currentMessageCount = messageHistory.length; // 현재 채팅방의 메시지 수를 가져오는 함수 (예시)
            console.log(`⏰시간당 메세지 ${currentMessageCount} 개 도달`)
        })

        timerId = setInterval(() => {
            
            if (currentMessageCount >= chatroomActivityThreshold) {
            handleActiveChatroom();
            } else {
            handleInactiveChatroom();
            }

        }, activityCheckInterval);
    };
    
    const handleActiveChatroom = () => {
        alert('이 채팅방은 활발합니다!');
        // 활발한 채팅방 UI 표시 등의 추가 로직 구현
    };
    
    const handleInactiveChatroom = () => {
        alert('이 채팅방은 비활동적입니다.');
        // 활동하지 않는 채팅방 UI 처리 등의 추가 로직 구현
    };
    
    startActivityMonitoring();
    
    return () => {
        clearInterval(timerId);
    };
      
};

export default ActiveChatroomChecker;