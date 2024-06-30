import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/FeedCalender.css'; // 추가 CSS 파일
import axios_api from '../../../../lib/axios_api';

const FeedCalendar = ({buildingId}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  const fetchEvents = async (buildingId) => {
    let url = `/feed/getFeedEvent?buildingId=${buildingId}`

    try {
      const response = await axios_api.get(url);
      if(response.data !== null || response.data.length > 0) {
        const eventData = response.data;
        console.log(eventData);
        const eventMap = {};

        // 데이터 필터링 및 맵핑
        eventData.forEach(event => {
            const dateKey = event.eventDate.split('T')[0];
            if (!eventMap[dateKey]) {
              eventMap[dateKey] = [];
            }
            eventMap[dateKey].push(event.title);
        });

        setEvents(eventMap);
      } else {
        console.log('지정된 이벤트가 없습니다.');
      }

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchEvents(buildingId);
  }, [buildingId])

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

