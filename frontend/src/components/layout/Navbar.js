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
      <div
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{ height: 50 }}>
        <LinkContainer to="/">
          <div>Workplace</div>
        </LinkContainer>
        <div id="basic-navbar-nav">
          {userInfo ? (
            <>
              <span>
                {userInfo.name}
              </span>
              <LinkContainer to="/profiles">
                <span className="bg-violet-600 hover:bg-violet-700">
                  Developers
                </span>
              </LinkContainer>
              <LinkContainer to="/employers">
                <span>
                  For Employers
                </span>
              </LinkContainer>
              <LinkContainer to="/posts">
                <span>
                  NewsFeed
                </span>
              </LinkContainer>
              <LinkContainer to="/home">
                <span>
                  Home
                </span>
              </LinkContainer>
              <span onClick={logoutHandler}>
                Logout
                </span>
            </>
          )
            : ''}
        </div>
      </div>
    </header>
  )
}

export default Header;
