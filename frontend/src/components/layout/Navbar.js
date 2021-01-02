import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from "../../actions/auth";

const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  //   const authLinks = (
  //     <ul>
  //       <li>
  //         <Link to="/profiles">Developers</Link>
  //       </li>
  //       <li>
  //         <Link to="/employers">For Employers</Link>
  //       </li>
  //       <li>
  //         <Link to="/posts">Posts</Link>
  //       </li>
  //       <li>
  //         <Link to="/home">
  //           <span className="hide-sm">Home</span>
  //         </Link>
  //       </li>
  //       <li>
  //         <a onClick={logout} href="#!">
  //           <i className="fas fa-signout-alt"> </i>
  //           {""}
  //           <span className="hide-sm">logout</span>
  //         </a>
  //       </li>
  //     </ul>
  //   );

  //   const guestLinks = (
  //     <ul>
  //       <li>
  //         <Link to="/profiles">Developers</Link>
  //       </li>
  //       <li>
  //         <Link to="/register">Register</Link>
  //       </li>
  //       <li>
  //         <Link to="/login">Login</Link>
  //       </li>
  //     </ul>
  //   );
  // };

  return (
    <header>
      <Navbar bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Work Place</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name}
                  id='username'>
                  <LinkContainer to="/profiles">
                    <NavDropdown.Item>
                      Developers
                </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profiles">
                    <NavDropdown.Item>
                      For Employers
                </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profiles">
                    <NavDropdown.Item>
                      Posts
                </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/home">
                    <NavDropdown.Item>
                      Home
                </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </>
            ) : (
                <>
                  <LinkContainer to="/profiles">
                    <NavDropdown.Item>
                      Developers
                </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profiles">
                    <NavDropdown.Item>
                      For Employers
                </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profiles">
                    <NavDropdown.Item>
                      Posts
                </NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
