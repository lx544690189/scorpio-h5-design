import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

class Coupon extends React.Component {
  static defaultProps = {
    className: '',
    info: '有效期：领取5天后',
    title: '新用户体验券',
    status: 1,
    amount: 5,
  };

  static propTypes = {
    className: PropTypes.string,
    /**
     * 券状态：
     * 1.待领取
     * 2.领取成功
     * 3.领取失败
     */
    status: PropTypes.number,
    title: PropTypes.string,
    info: PropTypes.string,
    amount: PropTypes.number,
  };

  render() {
    const { className, status, title, info, amount } = this.props;
    return (
      <div className={classnames('re-coupon', className, `status-${status}`)}>
        <div className="re-coupon-left">
          <span className="re-coupon-left-unit">￥</span>
          <span className="re-coupon-left-num">{amount}</span>
        </div>
        <div className="re-coupon-right">
          <div className="re-coupon-right-title">{title}</div>
          <div className="re-coupon-right-info">{info}</div>
        </div>
      </div>
    );
  }
}

export default Coupon;
