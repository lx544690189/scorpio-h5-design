/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useEffect, useRef } from 'react';
import './index.less';
import DragContainer from './components/DragContainer';
import { useModel } from 'umi';
import { childrenModel } from '@/utils/bridge';
import Postmate from 'Postmate';
import html2canvas from 'html2canvas';
import { useDebounceFn, useScroll, useThrottleFn } from 'ahooks';

export default function() {
  const { setStateByObjectKeys } = useModel('bridge');
  const canvasRef = useRef<HTMLDivElement>(null);
  const scroll = useScroll(canvasRef);
  const { run } = useDebounceFn(
    () => {
      const container = window.document.getElementsByName('component-container');
      const element = Array.from(container).find((item:any)=>item.dataset.selected === 'true');
      if(element){
        const data = element.getBoundingClientRect().toJSON();
        window.postmate_parent.emit(childrenModel.DOM_REACT_CHANGE, data);
      }
    },
    {
      wait: 100,
    },
  );

  useEffect(()=>{
    run();
  }, [scroll]);

  useEffect(()=>{
    const handshake = new Postmate.Model({
      [childrenModel.SYNC_STATE]: (message: any)=>{
        setStateByObjectKeys(message, false);
      },
      [childrenModel.CAPTURE]: async()=>{
        const captureDom = canvasRef.current;
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