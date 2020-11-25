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
  /** 当前拖拽元素即将插入的位置索引（从0开始，-1为初始值） */
  const [dragingComponentIndex, setDragingComponentIndex] = useState(-1);

  /** 选中组件 */
  const onSelectComponent = function(item: any, index: number) {
    console.log('index: ', index);
    console.log('item: ', item);
    //
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

  const onDrop = function(ev: React.DragEvent<HTMLDivElement>, index: number) {
    const components: any[] = pageSchema[selectPageIndex].components;
    components.splice(index, 0, dragComponent);
    console.log('components: ', components);
    setDragingComponentIndex(-1);
    setDragComponent(undefined);
    setPageSchema(pageSchema);
    ev.preventDefault();
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
  };
}
