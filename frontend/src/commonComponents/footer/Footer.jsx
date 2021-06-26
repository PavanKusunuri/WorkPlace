import React from 'react'
import styles from './footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footerSection}>
            <span className={styles.footerItem}>Workplace@2021</span>
            <span className={styles.footerItem}>User Agreement</span>
            <span className={styles.footerItem}>Privacy Policy</span>
            <span className={styles.footerItem}>Community Guidelines</span>
            <span className={styles.footerItem}>Cookie Policy</span>
            <span className={styles.footerItem}>CopyRight Policy</span>
            <span className={styles.footerItem}>Send Feedback</span>
        </div>
    )
}

export default Footer
