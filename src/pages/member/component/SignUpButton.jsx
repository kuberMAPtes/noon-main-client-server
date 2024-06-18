import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import styles from "../../../assets/css/module/member/SignUpButton.module.css";
const SignUpButton = () => {

    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate(`/member/getSignUpTermAgreement`);
    }

    return (
        <Button variant="success" className={`d-flex align-items-center justify-content-center ${styles.loginButton} ${styles.customButton}`}>
            회원가입하기
          </Button>
    )
}
export default SignUpButton;
