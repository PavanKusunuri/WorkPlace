import React from "react";
import styles from './landing.module.scss';

const Landing = () => {
  return (
    <div className={styles.landingPage}>
      <nav className={styles.nav}>
        <div className={styles.workplace}>Workplace</div>
        <div className={styles.flexItems}>
          <button className={styles.navButtonTerritory}> Join now</button>
          <button className={styles.navButtonSecondary}> Sign in</button>
        </div>
       </nav>
        <main className={styles.main} role="main" id="main-content">
          <section className={`${styles.header} ${styles.section}`}>
            <div className={styles.headline}>
              Welcome to your professional community
            </div>
            <div>
              <ul>
                <li>Search for a job</li>
                <li>Find a person you know</li>
                <li> Learn a new skill</li>
              </ul>
            </div>
            <div>

            </div>
          </section>
          <section className={`${styles.openJobs} ${styles.section}`}>
            <div>
               Find open jobs and internships
       </div>
       <div>
SUGGESTED SEARCHES
Enginnering 
Business Development
Finance
Administative Assistant
Retail Associate
Customer Service
Operations
Information Technology
Marketing
Human Resources 
Show More...
       </div>
  </section>

  <section className={`${styles.section} ${styles.postJob}`}>
    <div>
      Post your job and find the people you need 
       <button>Post a job</button>
    </div>
  </section>

  <section className={`${styles.section} ${styles.openToWork}`}>
    </section>


    <section className={`${styles.section} ${styles.connectAndLearn}`}>
   
   <div>
     <div>
       Connect with people who can help
       <button>Find people you know</button>
     </div>
     <div>
       Learn the skills that can help you know
       <button> Choose a topic to learn about</button>
     </div>
     </div>
      </section>
      <section className={styles.usefulLinks}>
        <div>General</div>
      </section>
   
  </main>
  <footer className={styles.footer}>
  <ul className={`${styles.footerList}`}>
<li className={styles.footerItem}>Workplace @2021</li>
<li className={styles.footerItem}>About</li>
<li className={styles.footerItem}>Accessibility</li>
<li className={styles.footerItem}>User Agreement</li>
<li className={styles.footerItem}>Privacy Policy</li>
<li className={styles.footerItem}>Cookie Policy</li>
<li className={styles.footerItem}>Copyright Policy</li>
<li className={styles.footerItem}>Brand Policy</li>
<li className={styles.footerItem}>Guest Controls</li>
<li className={styles.footerItem}> Community Guidelines</li>
<li className={styles.footerItem}>Language</li>
      </ul>
  </footer>
  </div>
  );
};

export default Landing;
