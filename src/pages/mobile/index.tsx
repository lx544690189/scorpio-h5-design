import React, { useEffect, useState } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import Postmate from 'postmate';
import { useModel } from 'umi';
import { EVENT_TYPE } from '@/types/event';

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

export default function() {

  const { setIsDraging, setDragComponent, isDraging, setPageSchema, setSelectPageIndex } = useModel('mobile');
  console.log('isDraging: ', isDraging);

  useEffect(() => {
    // postmessage同步状态
    if (location.href.includes('/mobile')) {
      window.addEventListener('message', (event) => {
        if (event.data && event.data.type !== undefined) {
          const { type, payload } = event.data;
          if (type === EVENT_TYPE.drag_component) {
            setIsDraging(event.data.isDraging);
            const { isDraging, component } = payload;
            setIsDraging(isDraging);
            setDragComponent(component);
          }
          if (type === EVENT_TYPE.page_edit) {
            const { pageSchema } = payload;
            setPageSchema(pageSchema);
          }
          if (type === EVENT_TYPE.page_select_change) {
            const { selectPageIndex } = payload;
            setSelectPageIndex(selectPageIndex);
          }
        }
      }, false);
    }
  }, []);

  return (
    <div
      className="h5-canvas"
    >
      <DragContainer />
    </div>
  );
}