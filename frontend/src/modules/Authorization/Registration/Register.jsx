import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
// import { Card, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import styles from './register.module.css';
import Footer from '../../../commonComponents/footer/Footer';

const Register = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
   
      dispatch(register(firstName, lastName, email, password));
    // }
  };


  return (
    <Fragment>
        <main className="border">
          <header>
          <div className={styles.logoContainer}> Workplace</div>
          <h1 className={styles.mainSubTitle}> Make the most of your professional life</h1>
          </header>
      <div className={styles.registerCard}>
        <div>
          <form className="form">
          <div className="form-group">
              <label for="name">First Name</label>
              <input
                type="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label for="name">Last Name</label>
              <input
                type="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="password">Password (6 or more characters</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
       <span className={styles.userAgreement}>By clicking Agree & Join, you agree to the Workplace User Agreement, Privacy Policy, and Cookie Policy.</span>
            <button className={styles.registerButton} onClick={onSubmit}>Agree & Join </button>
          </form>
          <p className={styles.mainSigninContainer}>
            Already on Workplace ? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
</main>
<Footer />
    </Fragment>
  );
};

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
//   register: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default Register;
