import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

export default function drag() {

  /** 是否拖拽中 */
  const [isDraging, setIsDraging] = useState(false);
  /** 当前拖拽的组件 */
  const [dragComponent, setDragComponent] = useState(undefined);
  /** 页面结构schema */
  const [pageSchema, setPageSchema] = useState<any[]>([]);
  /** 当前选中的页面 */
  const [selectPageIndex, setSelectPageIndex] = useState(-1);
  /** 当前拖拽元素即将插入的位置索引（从0开始，-1为初始值） */
  const [dragingComponentIndex, setDragingComponentIndex] = useState(-1);
  /** 当前选中的组件 */
  const [selectComponent, setSelectComponent] = useState<any>(undefined);

  /** 选中组件 */
  const onSelectComponent = function(item: any) {
    console.log('item: ', item);
    setSelectComponent(item);
  };

  /** 拖拽-进入 */
  const onDragEnter = function(
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) {
    console.log('index: ', index);
    setDragingComponentIndex(index);
  };

  /** 拖拽-离开 */
  const onDragLeave = function(
    e: React.DragEvent<HTMLDivElement>
  ) {
    setDragingComponentIndex(-1);
  };

  /** 拖拽-放置 */
  const onDrop = function(ev: React.DragEvent<HTMLDivElement>, index: number) {
    const components: any[] = pageSchema[selectPageIndex].components;
    components.splice(index, 0, dragComponent);
    setDragingComponentIndex(-1);
    setDragComponent(undefined);
    setPageSchema(pageSchema);
    ev.preventDefault();
  };

  const reorder = (components: any, startIndex: number, endIndex: number) => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /** 排序拖拽-放置 */
  const onSortEnd = function(result: DropResult, currentPageComponents:any[]) {
    console.log('currentPageComponents: ', currentPageComponents);
    if (!result.destination) {
      return;
    }
    const reorderedComponents = reorder(currentPageComponents, result.source.index, result.destination.index);
    console.log('reorderedComponents: ', reorderedComponents);
    pageSchema[selectPageIndex].components = reorderedComponents;
    setPageSchema([...pageSchema]);
  };

  return {
    isDraging,
    setIsDraging,
    dragComponent,
    setDragComponent,
    pageSchema,
    setPageSchema,
    selectPageIndex,
    setSelectPageIndex,
    onSelectComponent,
    dragingComponentIndex,
    setDragingComponentIndex,
    onDragEnter,
    onDragLeave,
    onDrop,
    onSortEnd,
    selectComponent,
    setSelectComponent,
  };
}
