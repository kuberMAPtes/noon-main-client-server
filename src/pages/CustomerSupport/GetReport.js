import React from 'react';
import PropTypes from 'prop-types';
import CustomerSupportHeader from './components/CustomerSupportHeader';
import Footer from '../../components/common/Footer';

const GetReport = () => {
  return (
    <div>
      <CustomerSupportHeader title="신고 상세 보기" />
      <div>
        <div>
          <span>신고 ID: </span>
          <span>신고자 ID: </span>
          <span>피신고자 ID: </span>
          <span>신고 일자: </span>
          <span>신고 상태: </span>
        </div>
        <div>
          <p>신고 텍스트: </p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>다정 수치 감소량</th>
                <th>계정 잠금일수 연장</th>
                <th>신고 상태 설정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <select>
                    <option>1일</option>
                    <option>3일</option>
                    <option>7일</option>
                    <option>30일</option>
                  </select>
                </td>
                <td>대기</td>
                <td>
                  <select>
                    <option>승인</option>
                    <option>반려</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>신고 처리 안내문 텍스트</p>
        </div>
        <div>
          <button>뒤로</button>
          <button>신고 처리</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default GetReport;
