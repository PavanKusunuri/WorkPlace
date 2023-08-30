import React from 'react'
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
        <ul className={`${styles.footerList}`}>
      <li className={styles.footerItem}>Workplace @2023</li>
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
    )
}

export default Footer
