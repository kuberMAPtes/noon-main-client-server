import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptWithIv } from '../../util/crypto';
import Cookies from 'js-cookie';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddMember = () => {
    const [form, setForm] = useState({
        nickname: '',
        account: '',
        password: '',
        address: ''
    });


    const navigate = useNavigate();

    useEffect(() => {
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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 처리 로직 추가
        alert('회원가입이 완료되었습니다.');
        Cookies.remove('addMemberKey'); // 쿠키 삭제
        Cookies.remove('addMemberOtherKey'); // 쿠키 삭제
        navigate('/');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h1 className="mb-4 text-center">회원가입</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNickname" className="mb-3">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="닉네임을 입력하세요" 
                                name="nickname" 
                                value={form.nickname} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAccount" className="mb-3">
                            <Form.Label>계정</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="계정을 입력하세요" 
                                name="account" 
                                value={form.account} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="비밀번호를 입력하세요" 
                                name="password" 
                                value={form.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>주소</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="주소를 입력하세요" 
                                name="address" 
                                value={form.address} 
                                onChange={handleChange} 
                                required 
                            />
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
