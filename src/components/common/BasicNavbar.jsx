import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Navigator from "../../pages/feed/util/Navigator.js";

function BasicNavbar(args) {
  const [searchParams] = useSearchParams();
  const memberIdFromStore = useSelector((state) => state.auth.member.memberId);
  const memberIdFromURL = searchParams.get('memberId');
  const memberId = memberIdFromStore || memberIdFromURL || "로그인 안함";

  const {goToMemberProfile} = Navigator();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">NoonSNS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => goToMemberProfile(memberId)}>{memberId}</Nav.Link>
            <Nav.Link href="/feed/chart">Feed Chart</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Bitcamp</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
            KuberMaptes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNavbar;