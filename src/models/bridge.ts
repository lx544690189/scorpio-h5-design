import { IMessageType, syncState } from '@/utils/bridge';
import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
/**
 * 这份状态会在父页面和iframe中实时同步
 */
export default function bridge() {
  /** 是否拖拽中 */
  const [isDraging, setIsDraging] = useState(false);
  /** 当前拖拽的组件 */
  const [dragComponent, setDragComponent] = useState(undefined);
  /** 页面id */
  const [pageId, setPageId] = useState<string>();
  /** 页面结构schema */
  const [pageSchema, setPageSchema] = useState<any[]>([]);
  /** 当前选中的页面 */
  const [selectPageIndex, setSelectPageIndex] = useState(-1);
  /** 当前选中的组件 */
  const [selectComponentId, setSelectComponentId] = useState<any>(undefined);
  /** 当前拖拽元素即将插入的位置索引（从0开始，-1为初始值） */
  const [dragingComponentIndex, setDragingComponentIndex] = useState(-1);

  /**
   * 根据对象更新state
   * @param state
   */
  const setStateByObjectKeys = function(state: {
    isDraging?: boolean;
    dragComponent?: any;
    pageId?: string;
    pageSchema?: any[];
    selectPageIndex?: number;
    selectComponentId?: string;
    dragingComponentIndex?: number;
  }) {
    // 遍历key值set，可以避免不必要的渲染
    Object.keys(state).forEach((key) => {
      if (key === 'isDraging') {
        // @ts-expect-error
        setIsDraging(state.isDraging);
      }
      if (key === 'dragComponent') {
        setDragComponent(state.dragComponent);
      }
      if (key === 'pageId') {
        setPageId(state.pageId);
      }
      if (key === 'pageSchema') {
        // @ts-expect-error
        setPageSchema(state.pageSchema);
      }
      if (key === 'selectPageIndex') {
        // @ts-expect-error
        setSelectPageIndex(state.selectPageIndex);
      }
      if (key === 'selectComponentId') {
        setSelectComponentId(state.selectComponentId);
      }
      if (key === 'dragingComponentIndex') {
        // @ts-expect-error
        setDragingComponentIndex(state.dragingComponentIndex);
      }
    });
  };

  // 组件拖拽开始
  const onDragStart = function(component: any) {
    // 组件增加唯一标识
    component.uuid = uuidv4();
    const state = {
      isDraging: true,
      dragComponent: component,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'design',
      type: IMessageType.syncState,
    });
  };

  // 组件拖拽结束
  const onDragEnd = function() {
    const state = {
      isDraging: false,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'design',
      type: IMessageType.syncState,
    });
  };

  /** 拖拽-进入 */
  const onDragEnter = function(index: number) {
    const state = {
      dragingComponentIndex: index,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'mobile',
      type: IMessageType.syncState,
    });
  };

  /** 拖拽-离开 */
  const onDragLeave = function() {
    const state = {
      dragingComponentIndex: -1,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'mobile',
      type: IMessageType.syncState,
    });
  };

  /** 拖拽-放置 */
  const onDrop = function(ev: React.DragEvent<HTMLDivElement>, index: number) {
    ev.preventDefault();
    const components: any[] = pageSchema[selectPageIndex].components;
    components.splice(index, 0, dragComponent);
    const state = {
      dragingComponentIndex: -1,
      dragComponent: undefined,
      pageSchema,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'mobile',
      type: IMessageType.syncState,
    });
  };

  /** 重排 */
  const reorder = (components: any, startIndex: number, endIndex: number) => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * 排序拖拽-放置
   * @TODO 视图会闪烁
  */
  const onSortEnd = function(result: DropResult, currentPageComponents: any[]) {
    if (!result.destination) {
      return;
    }
    const reorderedComponents = reorder(currentPageComponents, result.source.index, result.destination.index);
    pageSchema[selectPageIndex].components = reorderedComponents;
    const state = {
      pageSchema,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'mobile',
      type: IMessageType.syncState,
    });
  };

  /** 选中组件 */
  const onSelectComponent = function(selectComponentId: string) {
    const state = {
      selectComponentId,
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'mobile',
      type: IMessageType.syncState,
    });
  };

  return {
    isDraging,
    dragComponent,
    pageId,
    pageSchema,
    selectPageIndex,
    selectComponentId,
    dragingComponentIndex,
    setStateByObjectKeys,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDrop,
    onSelectComponent,
    onSortEnd,
  };
}
