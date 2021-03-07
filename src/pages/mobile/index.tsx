/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useRef } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import { childrenModel } from '@/utils/bridge';
import Postmate from 'Postmate';
import html2canvas from 'html2canvas';

export default function() {
  const { setStateByObjectKeys, selectPage } = useModel('bridge');

  useEffect(()=>{
    const handshake = new Postmate.Model({
      [childrenModel.SYNC_STATE]: (message: any)=>{
        setStateByObjectKeys(message, false);
      },
      [childrenModel.CAPTURE]: async()=>{
        const captureDom = window.document.getElementById('snapshot-container');
        if(captureDom){
          const canvas = await html2canvas(captureDom, {
            useCORS: true,
            scale: 1,
          });
          return canvas.toDataURL('image/png');
        }
      },
    });
    handshake.then((parent) => {
      window.postmate_parent = parent;
    });
  }, []);

  return (
    <div
      className="h5-canvas"
      style={{backgroundColor: selectPage?.props?.backgroundColor}}
    >
      <div id="snapshot-container">
        <DragContainer />
      </div>
    </div>
  );
}