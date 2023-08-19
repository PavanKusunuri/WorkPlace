

// 'use client'
import React, { Fragment, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import Footer from "../../commonComponents/footer/Footer";
import styles from './login.module.scss';


const Login = () => {

   const router = useRouter();

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
    router.push("/dashboard")
  }

  return (
    <Fragment>
      <header className={styles.companyHead}>
        <p>Workplace</p>
      </header>
      <div className={styles.loginForm}>
        <div className={styles.Card}>
          <div>
            <h1 className={styles.signInHeading}>Sign in</h1>
            <p className={styles.headerContent}>Stay updated in your professional world</p>
            <div>
              <div controlId="formBasicEmail">
                <input 
                  type="email"
                  placeholder="Email or Phone"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)} 
                />
              </div>
              <div controlId="formBasicPassword">
                <input 
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <button className={styles.loginButton} type="submit" onClick={(e) => onSubmit(e)}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.loginFormFooter}>
        <p className={styles.newToText}>New to Workplace ? <Link href="/register">Join now</Link></p>
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
