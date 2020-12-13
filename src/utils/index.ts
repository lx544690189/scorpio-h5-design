/** iframe消息传递 */
export const postMessageToMobile = function(message: any) {
  console.log('message: ', message);
  // @ts-expect-error
  window.document.querySelector('#mobile').contentWindow.postMessage(message, '*');
};
/** 像父页面传递消息 */
export const postMessageToParent = function(message: any) {
  console.log('message: ', message);
  window.parent.postMessage(message, '*');
};

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

export const pxToVw = function(px:number){
  return px ? px / 750* 100 : 0;
};