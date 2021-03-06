/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useRef } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import { childrenModel } from '@/utils/bridge';
import Postmate from 'Postmate';
import html2canvas from 'html2canvas';

export default function() {
  const { setStateByObjectKeys } = useModel('bridge');
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    console.log(window.frames['mobile']);
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
      [childrenModel.DOM_REACT_CHANGE]: ()=>{
        const container = window.document.getElementsByName('component-container');
        const element = Array.from(container).find((item:any)=>item.dataset.selected === 'true');
        if(element){
          return element.getBoundingClientRect().toJSON();
        }
      },
      [childrenModel.SCROLL_TO_POSITION]: (top: number)=>{
        // 获得滚动的像素数
        const container = canvasRef.current;
        if(container){
          container.scrollTo({
            top,
            behavior: 'smooth',
          });
        }
      },
    });
    handshake.then((parent) => {
      window.postmate_parent = parent;
    });
  }, []);

  return (
    <div
      ref={canvasRef}
      className="h5-canvas"
    >
      <div id="snapshot-container">
        <DragContainer />
      </div>
    </div>
  );
}