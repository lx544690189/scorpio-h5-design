import { DRAG_STATUS } from '@/types/drag';
import { EVENT_TYPE } from '@/types/event';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

export default function drag() {
  const [dragAction, setDragAction] = useState<{
    component?: React.Component | any;
    isDraging: boolean;
    status?: DRAG_STATUS;
    index?:number;
  }>({
    /** 当前拖动的组件 */
    component: undefined,
    /** 是否在拖动中 */
    isDraging: false,
    /** 拖动状态： */
    status: undefined,
    /** 将要放置的位置： */
    index: undefined,
  });

  const postMessage = function(message: any) {
    console.log('message: ', message);
    // @ts-expect-error
    document.querySelector('#mobile').contentWindow.postMessage(message, '*');
  };

  // 父页面-拖拽开始
  const onDragStart = function() {
    const payload = {
      component: {},
      isDraging: true,
    };
    setDragAction(payload);
    // 向子页面同步状态
    postMessage({
      type: EVENT_TYPE.master_drag_component,
      payload,
    });
  };

  // 父页面-拖拽结束
  const onDragEnd = function() {
    const payload = {
      component: {},
      isDraging: false,
    };
    setDragAction(payload);
    // 向子页面同步状态
    postMessage({
      type: EVENT_TYPE.master_drag_component,
      payload,
    });
  };


  const onDragEnter = function(e: React.DragEvent<HTMLDivElement>, index:number) {
    console.log('index: ', index);
    console.log(e.target);
    console.log('onDragEnter');
    setDragAction({
      component: {},
      isDraging: true,
      status: DRAG_STATUS.onDragEnter,
      index,
    });
  };

  const onDragOver = function(ev: React.DragEvent<HTMLDivElement>) {
    console.log('ev: ', ev.clientX, ev.clientY);
    ev.preventDefault();
    setDragAction({
      component: {},
      isDraging: true,
      status: DRAG_STATUS.onDragOver,
    });
  };

  const onDragLeave = function(e: React.DragEvent<HTMLDivElement>,  index:number) {
    console.log('index: ', index);
    console.log('onDragLeave');
    setDragAction({
      component: {},
      isDraging: true,
      status: DRAG_STATUS.onDragLeave,
      index: undefined,
    });
  };

  const onDrop = function(ev: React.DragEvent<HTMLDivElement>) {
    console.log('onDrop');
    ev.preventDefault();
    setDragAction({
      component: {},
      isDraging: true,
      status: DRAG_STATUS.onDrop,
    });
  };

  return {
    dragAction,
    setDragAction,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
  };
}
