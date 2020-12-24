/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import {IMessage, IMessageType, syncState} from '@/utils/bridge';

export default function() {

  const { setStateByObjectKeys } = useModel('bridge');

  useEffect(() => {
    registerPostmessageEventListener();
    onReady();
  }, []);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function(){
    window.addEventListener('message', (event) => {
      if (event.data && event.data.from === 'design') {
        const { payload, type } = event.data as IMessage;
        console.log('--------mobile----------');
        console.log(payload);
        console.log('--------mobile----------');
        if(type === IMessageType.syncState){
          setStateByObjectKeys(payload);
        }
      }
    });
  };

  /**
   * 子页面通信建立，通知父页面
   */
  const onReady = function(){
    syncState({
      payload: {},
      from: 'mobile',
      type: IMessageType.children_ready,
    });
  };

  return (
    <div
      className="h5-canvas"
    >
      <DragContainer />
    </div>
  );
}