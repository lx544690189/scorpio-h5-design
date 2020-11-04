import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

class Progress extends React.Component {
  static defaultProps = {
    className: '',
    percentage: 0,
  };

  static propTypes = {
    className: PropTypes.string,
    percentage: PropTypes.number,
  };

  render() {
    const { className, percentage } = this.props;
    return (
      <div
        className={classnames('crv2-progress', className, {
          full: percentage === 100,
        })}
      >
        <div className="crv2-progress-full">
          <div
            className="crv2-progress-bar"
            style={{ right: `${100 - percentage}%` }}
          ></div>
        </div>
        <div className="crv2-progress-number">{`已抢${percentage}%`}</div>
      </div>
    );
  }
}

export default Progress;
