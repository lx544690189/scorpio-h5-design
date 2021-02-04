import { history } from 'umi';
/** 同步状态target */
export enum targetType {
  /** 父页面 */
  parent = 1,
  /** 子页面 */
  children = 2,
}

export enum IMessageType {
  /** 同步状态 */
  syncState = 1,
  /** 子页面-事件通道建立 */
  children_ready,
  /** 生成截图 */
  capture,
}

export interface IMessage {
  payload: any;
  type: IMessageType,
}

export enum childrenModel {
  /** 同步状态 */
  SYNC_STATE = 'syncState',
  /** 截图 */
  CAPTURE = 'capture',
  /** 选中组件位置信息 */
  DOM_REACT_CHANGE = 'domReactChange',
}

export function isMobile(){
  const {pathname} = history.location;
  return pathname === '/mobile';
}

/**
 * 同步状态
 */
export function syncState(message: IMessage) {
  if (isMobile()) {
    window.postmate_parent.emit(childrenModel.SYNC_STATE, message.payload);
  } else {
    window.postmate_mobile.call(childrenModel.SYNC_STATE, message.payload);
  }
}

export const onChildrenReady = function(callback: () => any) {
  if (window.isChildren_ready) {
    callback();
  } else {
    if (!window.children_ready_task) {
      window.children_ready_task = [];
    }
    window.children_ready_task.push(callback);
  }
};

export const doChildrenReady = function() {
  window.isChildren_ready = true;
  if (window.children_ready_task) {
    window.children_ready_task.map((callback) => callback());
  }
};

export const doChildrenDestroy = function(){
  window.isChildren_ready = false;
  window.children_ready_task = [];
};