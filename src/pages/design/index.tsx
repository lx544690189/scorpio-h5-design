import React, { useEffect } from 'react';
import './index.less';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import { EVENT_TYPE } from '@/types/event';
import { useModel } from 'umi';
import { doChildrenReady, IMessage, IMessageType } from '@/utils/bridge';
import Header from './components/Header';

export default function() {
  const { setStateByObjectKeys } = useModel('bridge');

  useEffect(() => {
    registerPostmessageEventListener();
  }, []);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function(){
    window.addEventListener('message', (event) => {
      if (event.data && event.data.from === 'mobile') {
        const { payload, type } = event.data as IMessage;
        console.log('--------design----------');
        console.log(payload);
        console.log('--------design----------');
        if(type === IMessageType.syncState){
          setStateByObjectKeys(payload);
        }
        if(type === IMessageType.children_ready){
          doChildrenReady();
        }
      }
    });
  };

  return (
    <div className="design">
      <Header />
      <SideLeft />
      <div className="side-right">
        <SideRight />
      </div>
      <div className="center">
        <iframe src="/#/mobile" className="mobile" id="mobile"/>
      </div>
    </div>
  );
}