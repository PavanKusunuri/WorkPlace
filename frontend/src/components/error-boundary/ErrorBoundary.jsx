import React from "react";
import styles from './errorBoundary.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    // process the error
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorImageOverlay}>
          <div className={styles.errorImageContainer}>
            <div className={styles.errorImageText}>Sorry, this page is broken
          </div>
        </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
