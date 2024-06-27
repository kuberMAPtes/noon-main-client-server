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
  
  // Initialize the FirebaseUI Widget using Firebase.
  return (
    <></>
  );
};

export default B;
