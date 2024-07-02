import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DajungModal from "./DajungModal";
import SmallAlertStyle from "../common/SmallAlertStyle";
import { updateDajungScore } from "../../function/memberAxios";
import { FaTemperatureFull,FaFire,FaTemperatureEmpty,FaTemperatureQuarter,FaTemperatureHalf,FaTemperatureThreeQuarters, FaSnowflake   } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { MdWaterDrop } from "react-icons/md";

const MySwal = withReactContent(Swal);

const DajungScore = ({ profile, setProfile, toId , fromId }) => {
  const [showModal, setShowModal] = useState(false);
  const [dajungTemperature, setDajungTemperature] = useState("");

  useEffect(() => {
    if (profile.dajungScore >= 80) {
      setDajungTemperature(
        <div>
          <FaFire style={{ fontSize: "1.2rem", color: "#FF4500" }} /> 매우 따뜻함
        </div>
      );
    } else if (profile.dajungScore >= 60) {
      setDajungTemperature(
        <div>
          <IoSunny style={{ fontSize: "1.2rem", color: "#FFA500" }} /> 따뜻함
        </div>
      );
    } else if (profile.dajungScore >= 40) {
      setDajungTemperature(
        <div>
          <FaTemperatureHalf  style={{ fontSize: "1.2rem", color: "#FFD700" }} /> 보통
        </div>
      );
    } else if (profile.dajungScore >= 20) {
      setDajungTemperature(
        <div>
          <MdWaterDrop style={{ fontSize: "1.2rem", color: "#1E90FF" }} /> 차가움
        </div>
      );
    } else {
      setDajungTemperature(
        <div>
          <FaSnowflake  style={{ fontSize: "1.2rem", color: "#1E90FF" }} /> 매우 차가움
        </div>
      );
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
      timer: 700,
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
      <Row style={{width:"100%",height:"100%"}}>
        {/* <Col
          xs={3}
          style={{
            fontSize: "12px",
            padding: "0px 0px 0px 0px",
            textAlign: "left",
          }}
        >
        </Col> */}
        <Col
          xs={6}
          className="d-flex flex-column align-items-start"
          style={{
            padding: "0px",
            fontWeight: 900,
            fontSize: "12px",
            textAlign:"center"
          }}
        >
          <div style={{ alignSelf: "left", width: "100%", textAlign: "left",padding:"0px 12px 0px 12px" }}>
            <FaTemperatureFull />&nbsp;&nbsp;다정 온도
          </div>
        </Col>
        <Col
        xs={6}
        className="d-flex flex-column align-items-start"
        style={{
          padding: "0px"
        }}
        >
          <ProgressBar
                now={profile.dajungScore}
                style={{ width: "100%", height: "1rem", cursor: "pointer"}}
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
          <div style={{ alignSelf: "center", width: "100%", textAlign: "center",fontSize:"10px",fontWeight:"900",paddingTop:"5%" }}>
            {dajungTemperature}
          </div>
        </Col>
        <Col xs={6}>
        </Col>
        <Col xs={6}>

        </Col>
      </Row>

      <DajungModal show={showModal} handleClose={handleClose} handleYes={handleYes} />
    </>
  );
};

export default DajungScore;
