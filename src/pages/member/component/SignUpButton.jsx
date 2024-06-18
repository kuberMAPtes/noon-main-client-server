import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import styles from "../../../assets/css/module/member/SignUpButton.module.css";
import SignUpButtonView from "./SignUpButtonView";
const SignUpButton = () => {

    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate(`/member/getSignUpTermAgreement`);
    }

    return (
        <SignUpButtonView onClick={handleSignUp} />
    )
}
export default SignUpButton;
