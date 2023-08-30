import React from "react";
import styles from './landing.module.css';
import Footer from '../../commonComponents/footer/Footer';

const Landing = ({ history }) => {
  return (
  <div className={styles.landingPage}>
    <nav className={styles.nav}>
      <div className={styles.workplace}>Workplace</div>
      <div className={styles.flexItems}>
        <button className={styles.navButtonTerritory} onClick={() => history.push("/register")}> Join now</button>
        <button className={styles.navButtonSecondary} onClick={() => history.push("/login")}> Sign in</button>
      </div>
    </nav>
    <main className={styles.main} role="main" id="main-content">
      <section className={`${styles.header} ${styles.section}`}>
        <div className={styles.headline}>
          Welcome to your professional community
        </div>
        <div className={styles.intentModule}>
          <ul>
            <li className={styles.linkButton}>Search for a job</li>
            <li className={styles.linkButton}>Find a person you know</li>
            <li className={styles.linkButton}> Learn a new skill</li>
          </ul>
        </div>
      </section>
      <section className={`${styles.openJobs} ${styles.section} ${styles.noMinHeight}`}>
        <div className={styles.search}>
          <div className={styles.jobFinder}>
            <h2 className={styles.jobFinderHeader}>Find open jobs and internships</h2>
          </div>        
          <div className={styles.suggestedSearch}>
            <div className={styles.suggestSearchList}>
              <h2 className={styles.suggestedSearchHeader}>SUGGESTED SEARCHES</h2>
              <ul className={styles.suggestedList}>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>Enginnering</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>Business Development</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>Finance</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>  Administative Assistant</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>Retail Associate</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}> Customer Service</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}> Operations</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}> Information Technology</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>Marketing</span>
                </li>
                <li className={styles.suggestedListItem}>
                  <span className={styles.item}>Human Resources</span>
                </li>
              </ul>
              <span className={styles.showMore}>Show More...</span>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.postJob} ${styles.sectionFull}`}>
        <div className={styles.talentFinder}>
          <h2 className={styles.talentFinderHeader}>
            Post your job and find the people you need 
          </h2>
          <button className={styles.item}>Post a job</button>
        </div>
      </section>

      <section className={`${styles.section} ${styles.openToWork}`}>
        <div className={styles.testimonials}>
          <h2 className={styles.testimonialsHeader}>Let the right people know you're open to work</h2>
          <div className={styles.tesimonialsContent}> With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you are looking for new job opportunities</div>
        </div>
      </section>


      <section className={`${styles.section} ${styles.connectAndLearn}`}>
        <div className={styles.connectContainer}>
          <div className={styles.connectPeople}>
            <h2 className={styles.connectPeopleHeader}>Connect with people who can help</h2> 
            <button className={styles.item}>Find people you know</button>
          </div>
          <div className={styles.learnSkills}>
            Learn the skills that can help you know
            <button className={styles.item}> Choose a topic to learn about</button>
          </div>
        </div>
      </section>
      <section className={styles.usefulLinks}>
        <div>General</div>
      </section>
    </main>
    <Footer/>
  </div>
  );
};

export default Landing;
