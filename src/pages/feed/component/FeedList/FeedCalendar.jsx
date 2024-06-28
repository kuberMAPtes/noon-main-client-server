import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/FeedCalender.css'; // 추가 CSS 파일

const FeedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // 예시 이벤트 데이터
  const events = {
    '2024-06-01': ['Event 1', 'Event 2'],
    '2024-06-15': ['Event 3'],
    '2024-07-04': ['Event 4', 'Event 5', 'Event 6'],
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDateKey = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dayClassName = (date) => {
    const formattedDate = formatDateKey(date);
    return events[formattedDate] ? 'has-event' : '';
  };

  const formattedDate = formatDateKey(selectedDate);
  const eventList = events[formattedDate] || [];

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dayClassName={dayClassName}
      />
      {selectedDate && (
        <div>
          <h2>{selectedDate.toDateString()}의 이벤트</h2>
          {eventList.length > 0 ? (
            <ul>
              {eventList.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <p>이 날짜에는 이벤트가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedCalendar;

