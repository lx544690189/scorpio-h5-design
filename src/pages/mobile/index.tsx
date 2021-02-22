/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useRef } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import { childrenModel } from '@/utils/bridge';
import Postmate from 'Postmate';
import html2canvas from 'html2canvas';
import { useDebounceFn, useScroll, useThrottle, useThrottleFn } from 'ahooks';

export default function() {
  const { setStateByObjectKeys, setScrollTop } = useModel('bridge');
  const canvasRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll(canvasRef);
  const throttledScroll = useThrottle(scroll.top, { wait: 100 });

  // 滚动事件，传递给parent
  useEffect(()=>{
    if(window.postmate_parent){
      setScrollTop(throttledScroll);
      window.postmate_parent.emit(childrenModel.ON_SCROLL, throttledScroll);
    }
  }, [throttledScroll]);

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