import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styles from '../../assets/css/module/member/color.module.css';
import { motion } from 'framer-motion';
const GetMemberId = () => {

    const {memberId} = useParams();
    

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
          <Row className="w-100">
            <Col xs={12} md={8} lg={6} className="mx-auto">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title className="mb-4"><strong>회원 아이디 확인</strong></Card.Title>
                  {memberId === 'fail' ? (
                    <Card.Text>회원님의 아이디를 찾을 수 없습니다.</Card.Text>
                  ) : (
                    <Card.Text>
                        가입하신 회원님의 아이디는{' '}
                            <strong className={styles.typicalColor}>{memberId}</strong>
                        {' '}
                    입니다.
                  </Card.Text>
                  )}
                  <div className="mt-4">
                  <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        >
                    <Link to="/member/loginForm">
                      <Button className={styles.typicalButtonColor}><strong>로그인 하기</strong></Button>
                    </Link>
                    </motion.div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
};

export default GetMemberId;