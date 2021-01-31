/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import { IMessage, IMessageType, syncState } from '@/utils/bridge';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { dataURLtoFile, ossClient } from '@/utils';
import Postmate from 'Postmate';

export default function() {
  const { setStateByObjectKeys, isDraging } = useModel('bridge');
  const canvasRef = useRef<HTMLDivElement>(null);
  const [test, setTest] = useState('init');

  useEffect(() => {
    registerPostmessageEventListener();
    onReady();
    const handshake = new Postmate.Model({
      height: 1,
    });
    handshake.then((parent) => {
      parent.emit('some-event', 'Hello, World!');
    });
  }, []);

  const syncState = useCallback((message: IMessage)=>{
    const { payload, type } = message;
    console.log('payload: ', payload);
    if (type === IMessageType.syncState) {
      setStateByObjectKeys(payload, false);
    }
  }, []);

  useEffect(()=>{
    const handshake = new Postmate.Model({
      // height: () => document.height || document.body.offsetHeight
      syncState: (message: IMessage)=>{
        const { payload, type } = message;
        if (type === IMessageType.syncState) {
          setStateByObjectKeys(payload, false);
        }
      },
    });
    handshake.then((parent) => {
      window.postmate_parent = parent;
      parent.emit('some-event', 'Hello, World!');
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

  /**
   * 子页面通信建立，通知父页面
   */
  const onReady = function() {
    syncState({
      payload: {},
      type: IMessageType.children_ready,
    });
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