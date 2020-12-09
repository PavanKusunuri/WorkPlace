import React from 'react';
import PropTypes from 'prop-types';
import styles from './spinner.scss';


const Spinner = () => {
    return (
        large ?
        <>
        {
            active ?
            <div className={styles.showSpinner}>
<div className={styles.loader}>
    <svg className={styles.circular} viewBox="25 25 50 50">
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />


    </svg>
</div>
            </div>: ''
        }
        </>
        : <>
        <div className={`${className} ${styles.spinner} ${active ? styles.active : ''}`} />
        </>
    )
}

Spinner.propTypes = {
  active: PropTypes.bool,
  size:PropTypes.string,
  className: PropTypes.string
}

Spinner.defaultProps = {
  active: false,
  size: '20px',
  className: '',
  large: false
}

export default Spinner;