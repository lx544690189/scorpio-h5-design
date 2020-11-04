import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

class Progress extends React.Component {

  static defaultProps = {
    className: '',
    percentage: 70,
  };

  static propTypes = {
    className: PropTypes.string,
    percentage: PropTypes.number,
    text: PropTypes.any,
  };

  render() {
    const { className, percentage, text } = this.props;
    return (
      <div
        className={classnames(
          'crgt-progress',
          className,
          { full: percentage === 100 }
        )}>
        <div className="crgt-progress-full">
          <div className="crgt-progress-bar" style={{ right: `${100 - percentage}%` }}></div>
        </div>
        <div className="crgt-progress-number">
          {
            text ? text : `${percentage}%`
          }
        </div>
      </div>
    );
  }
}

export default Progress;