import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Progress from './Progress';
import './index.scss';

class Button extends React.Component {
  static defaultProps = {
    className: '',
    type: 1,
    couponType: 1,
    amount: 5,
    discount: 3,
    teamSize: 10,
    name: '节日出行优惠',
  };

  static propTypes = {
    className: PropTypes.string,
    // 券类型
    type: PropTypes.number,
    // 券类型
    couponType: PropTypes.number,
    // 面值/最高抵扣
    amount: PropTypes.number,
    // 折扣
    discount: PropTypes.number,
    // 组团人数
    teamSize: PropTypes.number,
    // 券名称
    name: PropTypes.string,
  };

  handelClick = () => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  render() {
    const {
      className,
      type,
      couponType,
      amount,
      discount,
      teamSize,
      name,
    } = this.props;
    return (
      <div className={classnames(className, 'crv2-coupon', `type-${type}`)} id="coupon">
        <div className="crv2-coupon-tag" />
        <div className="crv2-coupon-left">
          <div className="crv2-coupon-left-price">
            {couponType === 1 && (
              <span>
                {amount}
                <span className="unit">元</span>
              </span>
            )}
            {couponType === 2 && (
              <span>
                {discount}
                <span className="unit">折</span>
              </span>
            )}
          </div>
          <div className="crv2-coupon-left-note">
            {{ '1': '无门槛立减', '2': `最高抵扣${amount}元` }[couponType]}
          </div>
        </div>
        <div className="crv2-coupon-right">
          <div>
            <div className="crv2-coupon-team-number">{teamSize}人团</div>
            <div className="crv2-coupon-title">{name}</div>
          </div>
        </div>
        <button className="crv2-coupon-btn" onClick={this.handelClick}>
          立即组团
        </button>
        <Progress percentage={20} />
      </div>
    );
  }
}

export default Button;
