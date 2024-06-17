import React, { useState } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function BasicNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark="true" full="false" expand="sm" container="fluid">
        <NavbarBrand href="/">Noon</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/WinterHana">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>집에 가기</DropdownItem>
                <DropdownItem>잠자기</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>퇴근하기</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>여기에 뭐 적음?</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default BasicNavbar;