import React from "react";
import { Button } from "react-bootstrap";
import styles from "../../../assets/css/module/member/SignUpButton.module.css";

const SignUpButtonView = ({ onClick }) => {
    return (
        <Button 
            variant="success" 
            className={`d-flex align-items-center justify-content-center ${styles.loginButton} ${styles.customButton}`}
            onClick={onClick}
        >
            회원가입
        </Button>
    );
}

export default SignUpButtonView;
