/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import DynamicComponent from '@/pages/mobile/components/DynamicComponent';
import { useModel } from 'umi';
import { EVENT_TYPE } from '@/types/event';
import {postMessageToParent} from '@/utils';

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

  useEffect(() => {
    registerPostmessageEventListener();
    onReady();
  }, []);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function(){
    if (location.href.includes('/mobile')) {
      window.addEventListener('message', (event) => {
        if (event.data && event.data.type !== undefined) {
          const { type, payload } = event.data;
          console.log('------------------');
          console.log(payload);
          console.log('------------------');
          /** 放置组件 */
          if (type === EVENT_TYPE.drag_component) {
            setIsDraging(event.data.isDraging);
            const { isDraging, component } = payload;
            setIsDraging(isDraging);
            setDragComponent(component);
          }
          /** 页面编辑 */
          if (type === EVENT_TYPE.page_edit) {
            const { pageSchema, selectPageIndex } = payload;
            setPageSchema(pageSchema);
            setSelectPageIndex(selectPageIndex);
          }
          /** 选中页面 */
          if (type === EVENT_TYPE.page_select_change) {
            const { selectPageIndex } = payload;
            setSelectPageIndex(selectPageIndex);
          }
        }
      }, false);
    }
  };

  /**
   * 子页面通信建立，通知父页面
   */
  const onReady = function(){
    postMessageToParent({
      type: EVENT_TYPE.children_ready,
      payload: {},
    });
  };

  return (
    <div
      className="h5-canvas"
    >
      <DragContainer />
      {/* <DynamicComponent id="5efb06fb93f74734acf3ef2a"/> */}
    </div>
  );
}