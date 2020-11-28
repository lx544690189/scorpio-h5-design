import React from 'react';
import classnames from 'classnames';
import './index.scss';

interface IProps {
  className: string;
  status: number;
  title: string;
  info: string;
  amount: number;
}

export default function(props: IProps) {
  // const { className, status, title, info, amount } = props;
  const { className, status, title, info, amount } = {
    className: '',
    info: '有效期：领取5天后',
    title: '新用户体验券',
    status: 1,
    amount: 5,
  };
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
