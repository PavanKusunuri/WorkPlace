import React, { Fragment, useState } from "react";
// import connect from 'react-redux';
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import PropTypes from "prop-types";
import Footer from '../../../commonComponents/footer/Footer';
// import styles from './login.module.css';


const Login = () => {
  const history = useHistory();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, loading, status, error } = userLogin;

  // console.log("User Login Info here ********")

// console.log("userinfo"+ JSON.stringify(userInfo))
// console.log("status"+ status)
// console.log("loading"+ loading)
  // console.log("User Login Info Ends here ********")

  const { email, password } = values;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // if (status==="success") {
  //   history.push("/")
  // } else {
  //   console.log(error)
  // }

  return (
    <Fragment>
      { status === 'success' ? history.push('/'): ''}
      <div className="">
        <div className="flex justify-center">
          <div className="border">
            <h1 className="text-indigo text-lg">Sign in</h1>
            <p className="text-rose">Stay updated in your professional world</p>
          <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
                </label>
                <div className="mt-2">
                  <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => handleChange(e)} 
                />
                </div>
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
              <button className="py-2 mt-2 bg-#818cf8" type="submit" onClick={(e) => onSubmit(e)}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="">
        <p className="">New to Workplace ? <Link to="/register">Join now</Link></p>
      </div>
      <div className="">
        <Footer />
      </div>
    </Fragment >
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => {
//   userInfo: state.auth.userInfo
// }

// const mapDispatchToProps = () => {
  
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
