import React, { Fragment, useState } from "react";
// import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import { Card, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import styles from './register.module.scss';

const Register = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
        } else {
      dispatch(register(name, email, password));
    }
  };


  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }
  return (
    <Fragment>
        <section className={styles.registerContent}>
        <div className={styles.companyIntro}>
          <div> Workplace</div>
          <p>
            The main objective of this application is to reduce the gap between developers and companies to build the Next thing much faster.
          </p>
          </div>
      <Card className={styles.registerCard}>
        <Card.Body>
          <h3 className={styles.intro}>Register</h3>
          <form className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                // minLength="6"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                // minLength="6"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <Button className={styles.registerButton} onClick={onSubmit} className="btn btn-primary">Agree & Submit </Button>
          </form>
          <p className="my-1">
            Already on WorkPlace ? <Link to="/login">Login</Link>
          </p>
        </Card.Body>
      </Card>
</section>
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
