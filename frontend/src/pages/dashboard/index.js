import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from 'next/link';
// import { Link } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import Experience from "../../components/dashboard/Experience";
import Education from "../../components/dashboard/Education";
import Home from '../../modules/home';
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import DashboardActions from "../../components/dashboard/DashboardActions";
import styles from "../../components/dashboard/home.module.scss";

const HomeContainer = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
      <div className={styles.homePage}>
        <header className={styles.homeHeader}>
        <nav className={styles.homeNavigation}>
        <div className={styles.search}>
            <input type="text" placeholder="Search"></input>
          </div>
          <ul className={styles.navigationMenu}>
            <li className={styles.navigationItem}>Home</li>
            <li className={styles.navigationItem}>My Network</li>
            <li className={styles.navigationItem}>Jobs</li>
            <li className={styles.navigationItem}>Messaging</li>
            <li className={styles.navigationItem}>Notifications</li>
            <li className={styles.navigationItem}>Me</li>
          </ul>
          <hr />
          <span>post a job</span>
        </nav>
        </header>
        <Home />
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus"></i> deleteAccount
            </button>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              {" "}
          You have not yet setup a profile, please add some info
              <Link href="/create-profile" className="btn btn-primary my-1">
                Create Profile
          </Link>
            </Fragment>
          )}
      </div>
    );
};

HomeContainer.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.userLogin.userInfo,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  HomeContainer
);
