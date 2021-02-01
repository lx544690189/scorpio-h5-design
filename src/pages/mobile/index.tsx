/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import { childrenModel } from '@/utils/bridge';
import Postmate from 'Postmate';

export default function() {
  const { setStateByObjectKeys, isDraging } = useModel('bridge');
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handshake = new Postmate.Model({
      [childrenModel.SYNC_STATE]: (message: any)=>{
        setStateByObjectKeys(message, false);
      },
    });
    handshake.then((parent) => {
      window.postmate_parent = parent;
    });
  }, []);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function() {
    // const handshake = new Postmate.Model(model);
    // handshake.then((parent) => {
    //   window.postmate_parent = parent;
    //   parent.emit('some-event', 'Hello, World!');
    // });
    // window.addEventListener('message', (event) => {
    //   if (event.data && (event.data.from === '/design' || event.data.from === '/manage/component/detail')) {
    //     const { payload, type } = event.data as IMessage;
    //     if (type === IMessageType.syncState) {
    //       setStateByObjectKeys(payload, false);
    //     }
    //     if (type === IMessageType.capture) {
    //       const captureDom = canvasRef.current;
    //       if(captureDom){
    //         html2canvas(captureDom, {
    //           useCORS: true,
    //           scale: 1,
    //         }).then(async function(canvas) {
    //           const dataURL = canvas.toDataURL('image/png');
    //           const file = dataURLtoFile(dataURL, new Date().getTime().toString());
    //           const fileName = `${uuidv4()}.png`;
    //           await ossClient.put(`design/${fileName}`, file);
    //           window.parent.onCaptureComponentOver(fileName);
    //         });
    //       }
    //     }
    //   }
    // });
  };

  return (
    <div
      className="h5-canvas"
    >
      <div id="snapshot-container" ref={canvasRef}>
        <DragContainer />
      </div>
    </div>
  );
}