// import React, { Fragment, useState } from "react";
// import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
// import { setAlert } from "../../../actions/alert";
// import { register } from "../../../actions/auth";
// import { Card, Button } from 'react-bootstrap';
// import PropTypes from "prop-types";
// import { useSelector, useDispatch } from 'react-redux';
// import styles from './register.module.scss';
// import Footer from '../../../commonComponents/footer/Footer';

// const Register = () => {

//   const dispatch = useDispatch()
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     password2: "",
//   });

//   const { name, email, password, password2 } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== password2) {
//       setAlert("Passwords do not match", "danger");
//         } else {
//       dispatch(register(name, email, password));
//     }
//   };


//   // if (isAuthenticated) {
//   //   return <Redirect to="/dashboard" />;
//   // }

//   return (
//     <Fragment>
//         <main className={styles.main}>
//           <header>
//           <div className={styles.logoContainer}> Workplace</div>
//           <h1 className={styles.mainSubTitle}> Make the most of your professional life</h1>
//           </header>
//       <Card className={styles.registerCard}>
//         <Card.Body>
//           <form className="form">
//             <div className="form-group">
//               <label for="email">Email or phone number</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>
//             <div className="form-group">
//               <label for="password">Password (6 or more characters</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>
//        <span className={styles.userAgreement}>By clicking Agree & Join, you agree to the Workplace User Agreement, Privacy Policy, and Cookie Policy.</span>
//             <Button className={styles.registerButton} onClick={onSubmit}>Agree & Join </Button>
//           </form>
//           <p className={styles.mainSigninContainer}>
//             Already on Workplace ? <Link to="/login">Sign in</Link>
//           </p>
//         </Card.Body>
//       </Card>
// </main>
// <Footer />
//     </Fragment>
//   );
// };

// // Register.propTypes = {
// //   setAlert: PropTypes.func.isRequired,
// //   register: PropTypes.func.isRequired,
// // };

// // const mapStateToProps = (state) => ({
// //   isAuthenticated: state.auth.isAuthenticated,
// // });

// export default Register;
