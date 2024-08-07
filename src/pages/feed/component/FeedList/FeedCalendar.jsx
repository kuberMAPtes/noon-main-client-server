import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/FeedList/FeedCalender.css';
import navigator from '../../util/Navigator';
import axios_api from '../../../../lib/axios_api';
import { ListGroup } from 'react-bootstrap';
import { FaRegCalendarCheck } from "react-icons/fa";

const FeedCalendar = ({memberId, buildingId}) => {
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
          const [dateKey, timeKey] = event.eventDate.split('T');
            if (!eventMap[dateKey]) {
              eventMap[dateKey] = [];
            }
            eventMap[dateKey].push({
              title: event.title,
              feedId: event.feedId,
              time: timeKey.slice(0, 5)
            });
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

  const { goToFeedDetail } = navigator();

  const handleEventClick = (feedId) => {
    goToFeedDetail(memberId, feedId);
  };

  const formatSelectedDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  return (
    <div className='calendar-container'>
      <div className='calender-title'><FaRegCalendarCheck/> 이벤트</div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dayClassName={dayClassName}
      />
      {selectedDate && (
        <div className="event-list-container">
          <div className='calender-title'>{formatSelectedDate(selectedDate)}</div>
          {eventList.length > 0 ? (
            <ListGroup>
              {eventList.map((event, index) => (
                <ListGroup.Item key={index} action onClick={() => handleEventClick(event.feedId)}>
                  {event.time} - {event.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>이 날짜에는 이벤트가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedCalendar;

