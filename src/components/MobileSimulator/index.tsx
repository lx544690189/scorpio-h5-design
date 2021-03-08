import { useSize } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import './index.less';
import SelectArea from './SelectArea';
import {history, useModel} from 'umi';

interface IProps{
  loading: boolean;
}

export default function(props:IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const { setStateByObjectKeys } = useModel('bridge');
  useEffect(()=>{
    if(history.location.pathname === '/manage/component/detail' && !props.loading){
      setStateByObjectKeys({
        showSelectComponentBorder: false,
      });
    }
  }, [props.loading]);

  return (
    <div className="mobile-simulator-container">
      {(history.location.pathname !== '/manage/component/detail' && !props.loading) && <SelectArea size={size} loading={props.loading}/>}
      <div className="mobile-simulator">
        <div className="mobile-head-bar"></div>
        <div className="mobile-content" id="mobile-content" ref={ref} />
      </div>
    </div>
  );
}
