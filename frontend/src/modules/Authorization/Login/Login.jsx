import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import PropTypes from "prop-types";
import { Card, Form, Button } from 'react-bootstrap';
import { userLoginReducer } from "../../../reducers/auth";
import Footer from '../../../commonComponents/footer/Footer';
import styles from './login.module.scss';


const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;
  const { email, password } = values;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  //  Redirect if user logged in
  if (userInfo) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <header className={styles.companyHead}>
        <p>Workplace</p>
      </header>
      <div className={styles.loginForm}>
        <Card className={styles.Card}>
          <Card.Body>
            <h1 className={styles.signInHeading}>Sign in</h1>
            <p className={styles.headerContent}>Stay updated in your professional world</p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                  type="email"
                  placeholder="Email or Phone"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)} 
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control 
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Button className={styles.loginButton} type="submit" onClick={(e) => onSubmit(e)}>
                Sign in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className={styles.loginFormFooter}>
        <p className={styles.newToText}>New to Workplace ? <Link to="/register">Join now</Link></p>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </Fragment >
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
