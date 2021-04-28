import React from 'react'
import styles from './footer.module.scss';

const Footer = ({ props }) => {
    return (
        <div>
            <span className={styles.footerItem}  onClick={props.history.push('/')}>Way2Work@2021</span>
            <span className={styles.footerItem} onClick={props.history.push('/userAgreement')}>User Agreement</span>
            <span className={styles.footerItem} onClick={props.history.push('/privacyPolicy')}>Privacy Policy</span>
            <span className={styles.footerItem} onClick={props.history.push('/communityGuidelines')}>Community Guidelines</span>
            <span className={styles.footerItem} onClick={props.history.push('/CookiePolicy')}>Cookie Policy</span>
            <span className={styles.footerItem} onClick={props.history.push('/copyRightPolicy')}>CopyRight Policy</span>
            <span className={styles.footerItem} onClick={props.history.push('/sendFeedBack')}>Send Feedback</span>
        </div>
    )
}

export default Footer
