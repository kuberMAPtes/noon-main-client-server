import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

const SignUpButton = () => {

    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate(`/member/getSignUpTermAgreement`);
    }

    return (
        <Button onClick={handleSignUp} variant="secondary" className="mb-3">회원가입</Button>
    )
}
export default SignUpButton;
