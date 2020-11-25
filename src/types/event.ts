export enum EVENT_TYPE {
  /** 主页面拖拽组件事件 */
  drag_component,
  /** 页面编辑 */
  page_edit,
  /** 切换当前选取的页面 */
  page_select_change,
}

export interface IEventBody {
  type: EVENT_TYPE,
  <T>(payload: T): T;
}