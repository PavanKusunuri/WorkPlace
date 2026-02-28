import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const typeStyles = {
  danger: 'border-red-500/30   bg-red-500/10   text-red-300',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
  info: 'border-blue-500/30  bg-blue-500/10  text-blue-300'
};

const Alert = ({ alerts }) => (
  <div className="fixed top-16 inset-x-0 z-40 flex flex-col items-center gap-2 px-4 pt-3 pointer-events-none">
    {alerts.map((alert) => (
      <div
        key={alert.id}
        className={
          `pointer-events-auto w-full max-w-sm px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-medium animate-slide-down opacity-0` +
          ' ' +
          (typeStyles[alert.alertType] || typeStyles.info)
        }
        style={{ animationFillMode: 'forwards' }}
      >
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
