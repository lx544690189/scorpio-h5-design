export enum EVENT_TYPE {
  /** 主页面拖拽组件事件 */
  master_drag_component,
}

export interface IEventBody {
  type: EVENT_TYPE,
  <T>(payload: T): T;
}