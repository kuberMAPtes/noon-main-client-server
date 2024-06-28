import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DajungModal from "./DajungModal";
import SmallAlertStyle from "../common/SmallAlertStyle";
import { updateDajungScore } from "../../function/memberAxios";

const MySwal = withReactContent(Swal);

const DajungScore = ({ profile, setProfile, toId , fromId }) => {
  const [showModal, setShowModal] = useState(false);
  const [dajungTemperature, setDajungTemperature] = useState("");

  useEffect(() => {
    if (profile.dajungScore >= 80) {
      setDajungTemperature("매우 따뜻함");
    } else if (profile.dajungScore >= 60) {
      setDajungTemperature("따뜻함");
    } else if (profile.dajungScore >= 40) {
      setDajungTemperature("보통");
    } else if (profile.dajungScore >= 20) {
      setDajungTemperature("차가움");
    } else {
      setDajungTemperature("매우 차가움");
    }
  }, [profile.dajungScore]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleYes = async () => {
    handleClose();
    setProfile(prevProfile => ({
      ...prevProfile,
      dajungScore: Math.min(prevProfile.dajungScore + 1, 100)
    }));

    const dajungScoreDto = {memberId : toId, dajungScore : profile.dajungScore + 1};
    const response = await updateDajungScore(dajungScoreDto);
    // alert("이거보세요오오오"+JSON.stringify(response)+"toId"+toId+"profile.dajungScore"+profile.dajungScore);

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

  return (
    <>
      <SmallAlertStyle />
      <Row>
        <Col
          xs={3}
          style={{
            fontSize: "14px",
            padding: "0px 12px",
            textAlign: "left",
          }}
        >
          <Row>
            <Col xs={12}>
              다정 온도
            </Col>
            {toId !== fromId && 
            <Col xs={12} style={{ fontSize: "10px", position: "relative" }}>
              <span style={{ position: "absolute", whiteSpace: "nowrap" }}>
                다정 수치를 올릴 수 있어요!
              </span>
            </Col>
            }
          </Row>
        </Col>
        <Col xs={9}>
          <div className="d-flex flex-column align-items-center">
            <ProgressBar
              now={profile.dajungScore}
              style={{ width: "100%", height: "1rem", cursor: "pointer" }}
              onClick={toId !== fromId ? handleShow : null}
            >
              <div
                style={{
                  background: "#ff8787",
                  width: `${profile.dajungScore}%`,
                  height: `100%`
                }}
              ></div>
            </ProgressBar>
            <div>{dajungTemperature}</div>
          </div>
        </Col>
      </Row>

      <DajungModal show={showModal} handleClose={handleClose} handleYes={handleYes} />
    </>
  );
};

export default DajungScore;
