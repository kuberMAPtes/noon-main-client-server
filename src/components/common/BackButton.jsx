import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../css/BackButton.module.css"; // 모듈 CSS를 임포트합니다.
import { setBackButtonEnabled } from "../../redux/slices/backbuttonEnabledSlice";

const BackButton = () => {
  const dispatch = useDispatch();
  const isBackButtonEnabled = useSelector(
    (state) => state.backButtonEnabled.value
  );

  const handleBack = () => {
    // Implement your back button functionality here, e.g., navigating to the previous page.
    console.log("Back button clicked");
  };

  const toggleBackButton = () => {
    dispatch(setBackButtonEnabled(!isBackButtonEnabled));
  };

  return (
    <div>
      {isBackButtonEnabled && (
        <button className={styles.backButton} onClick={handleBack}>
          &#x2190; {/* Unicode for left arrow */}
        </button>
      )}
      <button onClick={toggleBackButton}>
        {isBackButtonEnabled ? "Disable Back Button" : "Enable Back Button"}
      </button>
    </div>
  );
};

export default BackButton;
