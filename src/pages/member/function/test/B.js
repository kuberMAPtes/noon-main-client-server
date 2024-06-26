import React, { useState } from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import module from "../../../../assets/css/module/member/GetMemberProfile.module.css";
const ProfilePhoto = ({ profile, defaultPhotoUrl, handleImageUpload }) => {
  const [preview, setPreview] = useState(profile.profilePhotoUrl || defaultPhotoUrl);

  useState(()=> {
    // alert("프로필 사진확인"+ JSON.stringify(profile));
  },[])

  const handleImageError = (event) => {
    event.target.src = defaultPhotoUrl;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        handleImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Image
        src={preview}
        roundedCircle
        className={`mb-3 ${module.fixedMargin} ${module.profilePhoto}`}
        style={{ cursor: "pointer" }}
        onError={handleImageError}
        onClick={triggerFileInput}
      />
      <input
        type="file"
        id="file-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

const B = () => {
  const profile = {
    profilePhotoUrl: "https://picsum.photos/id/237/200/300",
    // 기타 프로필 정보
  };

  const defaultPhotoUrl = "https://fastly.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE";

  const handleImageUpload = (file) => {
    // 여기서 파일 업로드 로직을 구현합니다.
    console.log("업로드할 파일:", file);
    // 예: 파일을 서버에 업로드하고 URL을 받아서 상태를 업데이트합니다.
  };

  return (
          <ProfilePhoto
            profile={profile}
            defaultPhotoUrl={defaultPhotoUrl}
            handleImageUpload={handleImageUpload}
          />
  );
};

export default B;
