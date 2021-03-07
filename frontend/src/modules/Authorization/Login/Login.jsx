import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import PropTypes from "prop-types";
import { Card, Form, Button } from 'react-bootstrap';
import { userLoginReducer } from "../../../reducers/auth";


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
      <Card>
        <Card.Body>
          <h1 className="medium">Login</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email"
                value={email}
                onChange={(e) => handleChange(e)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
    </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password"
                minLength="6"
                value={password}
                onChange={(e) => handleChange(e)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
              Login
  </Button>
            <p className="my-1">Don't have an account? <Link to="/register">Register</Link></p>
          </Form>
          {/* <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </form>
          <p className="my-1">Don't have an account? <Link to="/register">Register</Link></p> */}
        </Card.Body>
      </Card>

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
