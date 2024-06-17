import React, { useState } from 'react';
import { IoNotifications, IoSettingsSharp  } from "react-icons/io5";
import "../../assets/css/BasicNavbar.css";
import "../../assets/css/font.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
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
      <Navbar color="primary" light="true" full="false" expand="sm" container="fluid" className='font'>
        <NavbarBrand href="/">Noon</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                (회원 이름)
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option1</DropdownItem>
                <DropdownItem>Option2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Option3</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText className='navbar-icons'>
            <IoNotifications size="32"/>
            <IoSettingsSharp size="32"/>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default BasicNavbar;