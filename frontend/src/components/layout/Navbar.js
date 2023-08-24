import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { Navbar, NavDropdown } from 'react-bootstrap';
import { logout } from "../../actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      {/* <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{ height: 50 }}>
        <LinkContainer to="/">
          <Navbar.Brand>Workplace</Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="basic-navbar-nav">
          {userInfo ? (
            <>
              <NavDropdown.Item>
                {userInfo.name}
              </NavDropdown.Item>
              <LinkContainer to="/profiles">
                <NavDropdown.Item>
                  Developers
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/employers">
                <NavDropdown.Item>
                  For Employers
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/posts">
                <NavDropdown.Item>
                  NewsFeed
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/home">
                <NavDropdown.Item>
                  Home
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
                </NavDropdown.Item>
            </>
          ) */}
            {/* : ''} */}
        {/* </Navbar.Collapse> */}
      {/* </Navbar> */}
    </header>
  )
}

export default Header;
