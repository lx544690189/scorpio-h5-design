import { IComponentSchema, IPageSchema } from '@/types/schema';
import { IMessageType, isMobile, syncState } from '@/utils/bridge';
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
  const [dragComponent, setDragComponent] = useState<IComponentSchema | undefined>(undefined);
  /** 页面id */
  const [pageId, setPageId] = useState<string>();
  /** 页面结构schema */
  const [pageSchema, setPageSchema] = useState<IPageSchema[]>([]);
  /** TODO: 使用索引不太好（若增加页面排序） */
  const [selectPageIndex, setSelectPageIndex] = useState(-1);
  /** 当前拖拽元素即将插入的位置索引（从0开始，-1为初始值） */
  const [dragingComponentIndex, setDragingComponentIndex] = useState(-1);
  /** 当前选中的组件 */
  const [selectComponentId, setSelectComponentId] = useState<string | undefined>(undefined);
  /** 是否显示选中组件边界 */
  const [showSelectComponentBorder, setShowSelectComponentBorder] = useState(() => window.localStorage.getItem('selectArea_borderVisible') !== 'false');
  const selectPage = pageSchema[selectPageIndex];
  const selectComponent = (selectPage && selectComponentId) ? pageSchema[selectPageIndex].components.find((item) => item.uuid === selectComponentId) : undefined;

  /**
   * 根据对象更新state
   * @param state
   * @param isSyncState 是否在iframe之间同步状态，默认true
   */
  const setStateByObjectKeys = function(state: {
    isDraging?: boolean;
    dragComponent?: IComponentSchema;
    pageId?: string;
    pageSchema?: IPageSchema[];
    selectPageIndex?: number;
    selectComponentId?: string;
    dragingComponentIndex?: number;
    showSelectComponentBorder?: boolean;
  }, isSyncState = true) {
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
      if (key === 'showSelectComponentBorder') {
        // @ts-expect-error
        setShowSelectComponentBorder(state.showSelectComponentBorder);
      }
    });
    // iframe之间同步状态
    if (isSyncState) {
      syncState({
        payload: state,
        type: IMessageType.syncState,
      });
    }
    // TODO:同步移动端页面快照(性能问题暂不使用)
    if (!isMobile() && !isSyncState && window.postmate_mobile) {
      // capture.run();
    }
  };

  // 组件拖拽开始
  const onDragStart = function(component: IComponentSchema) {
    // 组件增加唯一标识
    component.uuid = uuidv4();
    setStateByObjectKeys({
      isDraging: true,
      dragComponent: component,
    });
  };

  // 组件拖拽结束
  const onDragEnd = function() {
    setStateByObjectKeys({
      isDraging: false,
    });
  };

  /** 拖拽-进入 */
  const onDragEnter = function(index: number) {
    setStateByObjectKeys({
      dragingComponentIndex: index,
    });
  };

  /** 拖拽-离开 */
  const onDragLeave = function() {
    setStateByObjectKeys({
      dragingComponentIndex: -1,
    });
  };

  /** 拖拽-放置 */
  const onDrop = function(ev: React.DragEvent<HTMLDivElement>, index: number) {
    ev.preventDefault();
    const components = pageSchema[selectPageIndex].components;
    components.splice(index, 0, dragComponent as IComponentSchema);
    setStateByObjectKeys({
      dragingComponentIndex: -1,
      dragComponent: undefined,
      pageSchema,
    });
  };

  /** 重排 */
  const reorder = (components: IComponentSchema[], startIndex: number, endIndex: number) => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * 排序拖拽-放置
   * @TODO 视图会闪烁
  */
  const onSortEnd = function(result: DropResult, currentPageComponents: IComponentSchema[]) {
    if (!result.destination) {
      return;
    }
    const reorderedComponents = reorder(currentPageComponents, result.source.index, result.destination.index);
    pageSchema[selectPageIndex].components = reorderedComponents;
    setStateByObjectKeys({
      pageSchema,
    });
  };

  /** 选中组件 */
  const onSelectComponent = function(id: string) {
    if (selectComponentId !== id) {
      setStateByObjectKeys({
        selectComponentId: id,
      });
    }
  };

  const changeContainerPropsState = function(key: string, value: unknown) {
    // @ts-expect-error
    selectComponent.containerProps[key] = value;
    setStateByObjectKeys({
      pageSchema: [...pageSchema],
    });
  };

  return {
    isDraging,
    dragComponent,
    pageId,
    pageSchema,
    selectPageIndex,
    dragingComponentIndex,
    setStateByObjectKeys,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDrop,
    onSelectComponent,
    onSortEnd,
    selectComponent,
    changeContainerPropsState,
    selectComponentId,
    showSelectComponentBorder,
    selectPage,
  };
}
