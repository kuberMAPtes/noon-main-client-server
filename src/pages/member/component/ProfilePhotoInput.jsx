import React, { useEffect, useState } from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import module from "../../../assets/css/module/member/GetMemberProfile.module.css";
const ProfilePhotoInput = ({ profile, defaultPhotoUrl, handleImageUpload }) => {
  const [preview, setPreview] = useState(profile.profilePhotoUrl || defaultPhotoUrl);

  useEffect(() => {
    console.log("프로필 사진 확인", JSON.stringify(profile.profilePhotoUrl));
    alert("프로필 사진 확인" + JSON.stringify(profile.profilePhotoUrl));
    setPreview(profile.profilePhotoUrl || defaultPhotoUrl);
  }, [profile.profilePhotoUrl,setPreview]);

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

export default ProfilePhotoInput;