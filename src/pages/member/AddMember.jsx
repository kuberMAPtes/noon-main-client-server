import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptWithIv } from '../../util/crypto';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {
    handleNicknameChange,
    handleMemberIdChange,
    handlePasswordChange,
    handleAddressChange,
    handleSubmit,
    checkNicknameAvailability,
    checkMemberIdAvailability
} from '../member/function/AddMemberUtil';

const AddMember = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 쿠키에서 인증 정보를 읽고, 본인인증을 완료했는지 확인
        const encryptedData = Cookies.get('addMemberKey');
        const ivData = Cookies.get('addMemberOtherKey');
        console.log('당신은 휴대폰인증을 했습니다 encryptedData:', encryptedData);
        console.log('당신은 휴대폰인증을 했습니다 ivData:', ivData);
        if (encryptedData && ivData) {
            const isVerified = decryptWithIv(encryptedData, ivData);
            if (isVerified !== 'success') {
                alert('본인인증을 완료해야 회원가입을 할 수 있습니다.');
                navigate('/member/getAuthMain');
            }
        } else {
            alert('본인인증을 완료해야 회원가입을 할 수 있습니다.');
            navigate('/member/getAuthMain');
        }
    }, [navigate]);

    // 각 필드의 상태와 유효성 메시지, 유효성 플래그 관리
    const [nickname, setNickname] = useState('');
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const [nicknameValidationMessage, setNicknameValidationMessage] = useState('');
    const [memberIdValidationMessage, setMemberIdValidationMessage] = useState('');
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [addressValidationMessage, setAddressValidationMessage] = useState('');

    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [isMemberIdValid, setIsMemberIdValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);

    const form = { nickname, memberId, password, address };

    const checkNickname = useCallback(
        async (nickname) => {
            await checkNicknameAvailability(nickname, setNicknameValidationMessage, setIsNicknameValid);
        },
        [setNicknameValidationMessage, setIsNicknameValid]
    );

    const checkMemberId = useCallback(
        async (memberId) => {
            await checkMemberIdAvailability(memberId, setMemberIdValidationMessage, setIsMemberIdValid);
        },
        [setMemberIdValidationMessage, setIsMemberIdValid]
    );

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h1 className="mb-4 text-center">회원가입</h1>
                    <Form onSubmit={handleSubmit(form, navigate)}>
                        <Form.Group controlId="formNickname" className="mb-3">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="닉네임을 입력하세요" 
                                name="nickname" 
                                value={nickname} 
                                onChange={handleNicknameChange(setNickname, setNicknameValidationMessage, setIsNicknameValid, checkNickname)} 
                                required 
                                isInvalid={!!nicknameValidationMessage}
                            />
                            {nicknameValidationMessage && (
                                <Form.Text className="text-danger">
                                    {nicknameValidationMessage}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formMemberId" className="mb-3">
                            <Form.Label>계정</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="계정을 입력하세요" 
                                name="memberId" 
                                value={memberId} 
                                onChange={handleMemberIdChange(setMemberId, setMemberIdValidationMessage, setIsMemberIdValid, checkMemberId)} 
                                required 
                                isInvalid={!!memberIdValidationMessage}
                            />
                            {memberIdValidationMessage && (
                                <Form.Text className="text-danger">
                                    {memberIdValidationMessage}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="비밀번호를 입력하세요" 
                                name="password" 
                                value={password} 
                                onChange={handlePasswordChange(setPassword, setPasswordValidationMessage, setIsPasswordValid)} 
                                required 
                                isInvalid={!!passwordValidationMessage}
                            />
                            {passwordValidationMessage && (
                                <Form.Text className="text-danger">
                                    {passwordValidationMessage}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>주소</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="주소를 입력하세요" 
                                name="address" 
                                value={address} 
                                onChange={handleAddressChange(setAddress, setAddressValidationMessage, setIsAddressValid)} 
                                required 
                                isInvalid={!!addressValidationMessage}
                            />
                            {addressValidationMessage && (
                                <Form.Text className="text-danger">
                                    {addressValidationMessage}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            회원가입
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddMember;
