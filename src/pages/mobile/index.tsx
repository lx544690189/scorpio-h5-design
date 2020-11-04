import React from 'react';
import './index.less';
import DragContainer from './components/DragContainer';

export default function() {
  const construct = {
    // 多页面
    pages: [
      {
        // 基本配置
        config: {
          // 页面标题
          title: '页面标题',
          // 路由
          router: '/',
          // 分享
          share: {
            type: [1, 2],
            desc: '邀请好友助力',
          },
        },
        // 组件（按数组顺序）
        components: [
          {
            name: '组件名称（中文）',
            schema: {
              type: 'object',
              properties: {
                string: {
                  title: '字符串',
                  type: 'string',
                  maxLength: 12,
                },
                number: {
                  title: '数字',
                  type: 'number',
                },
                select: {
                  title: '单选',
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumNames: ['早', '中', '晚'],
                  'ui:width': '50%',
                },
              },
            },
          },
        ],
      },
    ],
  };

  return (
    <div
      className="h5-canvas"
      // onDragStart={onDragStart}
      // onDragEnter={onDragEnter}
      // onDragOver={onDragOver}
      // onDragLeave={onDragLeave}
      // onDrop={onDrop}
    >
      {/* <div className="h5-canvas-block">
        <Coupon1
          {...{
            type: 1,
            couponType: 1,
            amount: 5,
            discount: 3,
            teamSize: 10,
            name: '节日出行优惠',
          }}
        />
      </div>
      <div className="h5-canvas-block">
        <Coupon2
          {...{
            info: '有效期：领取5天后',
            title: '新用户体验券',
            status: 1,
            amount: 5,
          }}
        />
      </div> */}
      <DragContainer />
    </div>
  );
}
