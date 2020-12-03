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