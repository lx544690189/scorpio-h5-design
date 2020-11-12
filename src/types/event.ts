export enum EVENT_TYPE {
  /** 主页面拖拽组件事件 */
  master_drag_component,
  /** 页面编辑 */
  page_change,
}

export interface IEventBody {
  type: EVENT_TYPE,
  <T>(payload: T): T;
}