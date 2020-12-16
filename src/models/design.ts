import { EVENT_TYPE } from '@/types/event';
import { postMessageToMobile } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function drag() {
  /** 是否拖拽中 */
  const [isDraging, setIsDraging] = useState(false);
  /** 当前拖拽的组件 */
  const [dragComponent, setDragComponent] = useState(undefined);
  /** 页面结构schema */
  const [pageSchema, setPageSchema] = useState<any[]>([]);
  /** 当前选中的页面 */
  const [selectPageIndex, setSelectPageIndex] = useState(-1);
  /** 当前选中的组件 */
  const [selectComponentId, setSelectComponentId] = useState<any>(undefined);

  // 组件拖拽开始
  const onDragStart = function(component:any) {
    // 组件增加唯一标识
    component.uuid = uuidv4();
    setIsDraging(true);
    setDragComponent(component);
    postMessageToMobile({
      type: EVENT_TYPE.drag_component,
      payload: {
        component,
        isDraging: true,
      },
    });
  };

  // 组件拖拽结束
  const onDragEnd = function() {
    postMessageToMobile({
      type: EVENT_TYPE.drag_component,
      payload: {
        component: dragComponent,
        isDraging: false,
      },
    });
    setIsDraging(false);
    setDragComponent(undefined);
  };

  const onDragOver = function(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  };

  const onDragLeave = function(
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) {
    console.log('index: ', index);
  };

  const onDrop = function(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  };

  /** 选中组件 */
  const onSelectComponent = function(item, index) {
    console.log('index: ', index);
    console.log('item: ', item);
    //
  };

  return {
    isDraging,
    setIsDraging,
    dragComponent,
    setDragComponent,
    pageSchema,
    setPageSchema,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onSelectComponent,
    selectPageIndex,
    setSelectPageIndex,
    selectComponentId,
    setSelectComponentId,
  };
}
