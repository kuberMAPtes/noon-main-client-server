import React, { useState, useEffect } from 'react';
import { Col, ProgressBar, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const B = () => {
  const [profile, setProfile] = useState({
    nickname: "홍길동",
    dajungScore: 50
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .small-alert {
        font-size: 0.9em;
      }
      .small-alert .swal2-title {
        font-size: 1.2em;
        padding: 0.5em;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleYes = () => {
    handleClose();
    setProfile(prevProfile => ({
      ...prevProfile,
      dajungScore: Math.min(prevProfile.dajungScore + 10, 100)
    }));
    MySwal.fire({
      title: `${profile.nickname}회원님의\n다정온도가 상승하였습니다`,
      timer: 3000,
      showConfirmButton: false,
      customClass: {
        popup: 'small-alert'
      },
      width: '300px',
      padding: '0.5em'
    });
  };

  const getDajungTemperature = (score) => {
    if (score < 20) return "매우 차가움";
    if (score < 40) return "차가움";
    if (score < 60) return "보통";
    if (score < 80) return "따뜻함";
    return "매우 따뜻함";
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">다정온도 데모</h2>
      <Col xs={9}>
        <div className="d-flex flex-column align-items-center">
          <ProgressBar
            now={profile.dajungScore}
            style={{ width: "100%", height: "1rem", cursor: "pointer" }}
            onClick={handleShow}
          >
            <div
              style={{
                background: "#ff8787",
                width: `${profile.dajungScore}%`,
                height: `100%`
              }}
            ></div>
          </ProgressBar>
          <div className="mt-2">{getDajungTemperature(profile.dajungScore)}</div>
          <div className="mt-2">현재 점수: {profile.dajungScore}</div>
        </div>
      </Col>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>다정온도 상승</Modal.Title>
        </Modal.Header>
        <Modal.Body>이 회원의 다정온도를 올리시는 거죠?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            아니오
          </Button>
          <Button variant="primary" onClick={handleYes}>
            예
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default B;