import { EVENT_TYPE } from '@/types/event';
import { useState, useEffect, useRef } from 'react';
import { useModel } from 'umi';
export default function postMessage() {
  const { setDragAction } = useModel('drag');

  useEffect(() => {
    if (location.href.includes('/mobile')) {
      // iframe页面，同步状态
      window.addEventListener('message', (event)=>{
        console.log('event: ', event.origin);
        console.log('event: ', event.data);
        const {type, payload} = event.data;
        if(type === EVENT_TYPE.master_drag_component){
          setDragAction(payload);
        }
      }, false);
    }else{

    }
  }, []);

}
