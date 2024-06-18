import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decryptWithIv } from '../../util/crypto';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {
    handleNicknameChange,
    handleMemberIdChange,
    handlePwdChange,
    redirectToPostcode,
    detailedAddressChangeHandler,
    addMemberSubmit
} from './function/AddUpdateMemberUtil';
import styles from '../../assets/css/module/member/AddMember.module.css';
import { useDispatch } from 'react-redux';

const AddMember = () => {
    
    // 각 필드의 상태와 유효성 메시지, 유효성 플래그 관리
    const [nickname, setNickname] = useState('');
    const [memberId, setMemberId] = useState('');
    const [pwd, setPwd] = useState('');
    const [address, setAddress] = useState('');
    
    const [nicknameValidationMessage, setNicknameValidationMessage] = useState('');
    const [memberIdValidationMessage, setMemberIdValidationMessage] = useState('');
    const [pwdValidationMessage, setPwdValidationMessage] = useState('');
    
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    const [isMemberIdValid, setIsMemberIdValid] = useState(false);
    const [isPwdValid, setIsPwdValid] = useState(false);
    
    const [zonecode, setZonecode] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    
    const fullAddress = address + ' ' + detailedAddress;
    const form = { nickname, memberId, pwd, fullAddress };
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // 쿠키에서 인증 정보를 읽고, 휴대폰 본인인증을 완료했는지 확인
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

    useEffect(() => {
        if (location.state && location.state.zonecode && location.state.address){
        setZonecode(location.state.zonecode);
        setAddress(location.state.address);
        setMemberId(location.state.memberId);
        setNickname(location.state.nickname);
        setPwd(location.state.pwd);

        handleNicknameChange({ target: { value: location.state.nickname } }, setNickname, setNicknameValidationMessage, setIsNicknameValid);
        handleMemberIdChange({ target: { value: location.state.memberId } }, setMemberId, setMemberIdValidationMessage, setIsMemberIdValid);
        handlePwdChange({ target: { value: location.state.pwd } }, setPwd, setPwdValidationMessage, setIsPwdValid);
      }
    }, [location.state]);



    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h1 className="mb-4 text-center">회원가입</h1>
                    
                    <Form>
                        <Form.Group controlId="formNickname" className="mb-3">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="닉네임을 입력하세요" 
                                name="nickname" 
                                value={nickname}
                                maxLength={20} 
                                onChange={(e)=>handleNicknameChange(e,setNickname, setNicknameValidationMessage, setIsNicknameValid)} 
                                required 
                                isInvalid={!!nicknameValidationMessage}
                            />
                            <Form.Text className="text-danger">
                            {nicknameValidationMessage && (
                                nicknameValidationMessage  
                            )}
                            </Form.Text>

                        </Form.Group>


                        <Form.Group controlId="formMemberId" className="mb-3">
                            <Form.Label>계정</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="계정을 입력하세요" 
                                name="memberId" 
                                value={memberId} 
                                maxLength={24}
                                onChange={(e)=>handleMemberIdChange(e,setMemberId, setMemberIdValidationMessage, setIsMemberIdValid)} 
                                required 
                                isInvalid={!!memberIdValidationMessage}
                            />
                            {memberIdValidationMessage && (
                                <Form.Text className="text-danger">
                                    {memberIdValidationMessage}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formPwd" className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="비밀번호를 입력하세요" 
                                name="pwd" 
                                maxLength={16}
                                value={pwd} 
                                onChange={(e)=>handlePwdChange(e,setPwd,  setPwdValidationMessage, setIsPwdValid)} 
                                required 
                                isInvalid={!!pwdValidationMessage}
                            />
                            {pwdValidationMessage && (
                                <Form.Text className="text-danger">
                                    {pwdValidationMessage}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>주소</Form.Label>
                            <div className={styles.addressGroup}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="주소를 입력하세요" 
                                    name="address" 
                                    value={address} 
                                    required
                                    readOnly
                                    className={styles.addressInput}
                                />
                                <Form.Control
                                 className={styles.zonecodeText}
                                 disabled
                                 value={zonecode}
                                />
                            </div>
                                <Form.Control
                                    type="text"
                                    placeholder="상세주소를 입력하세요"
                                    value={detailedAddress}
                                    onChange={(e)=>detailedAddressChangeHandler(e,setDetailedAddress)}
                                />

                                <Button type="button" onClick={()=>redirectToPostcode(memberId,nickname,pwd,navigate,location)}>
                                    주소 찾기
                                </Button>
                            
                        </Form.Group>

                        <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={!isNicknameValid || !isMemberIdValid || !isPwdValid}
                        onClick={()=>addMemberSubmit(form,dispatch, navigate)}>
                            회원가입
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddMember;
