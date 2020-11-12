/** iframe消息传递 */
export const postMessageToMobile = function(message: any) {
  console.log('message: ', message);
  // @ts-expect-error
  document.querySelector('#mobile').contentWindow.postMessage(message, '*');
};