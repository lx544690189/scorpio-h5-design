export enum EVENT_TYPE {
  /** 主页面拖拽组件事件 */
  drag_component,
  /** 页面编辑 */
  page_edit,
  /** 切换当前选取的页面 */
  page_select_change,
  /** 子页面-选中组件 */
  component_select,
  /** 子页面-事件通道建立 */
  children_ready,
}

export interface IEventBody {
  type: EVENT_TYPE,
  <T>(payload: T): T;
}