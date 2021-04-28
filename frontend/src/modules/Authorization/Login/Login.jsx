import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import PropTypes from "prop-types";
import { Card, Form, Button } from 'react-bootstrap';
import { userLoginReducer } from "../../../reducers/auth";
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
    console.log("event" + event)
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
        <div className={styles.loginCard}>
      <Card className={styles.Card}>
        <Card.Body>
          <h1 className={styles.signInHeading}>Sign in</h1>
          <p>Explore our community to find your community</p>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email or Phone" name="email"
                value={email}
                onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password"
                minLength="6"
                value={password}
                onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button className={styles.loginButton} variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
              Sign in
  </Button>
          </Form>
        </Card.Body>
      </Card>
</div>
      <p className={styles.newToText}>New to Workplace ? <Link to="/register">Join now</Link></p>
<div className={styles.footer}>
<span className={styles.footerItem}>Workplace@2021</span>
<span className={styles.footerItem}>User Agreement</span>
<span className={styles.footerItem}>Privacy Policy</span>
<span className={styles.footerItem}>Community Guidelines</span>
<span className={styles.footerItem}>Cookie Policy</span>
<span className={styles.footerItem}>CopyRight Policy</span>
<span className={styles.footerItem}>Send Feedback</span>

</div>
    </Fragment >
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default Login;
