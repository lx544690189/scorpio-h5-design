import { useSize } from 'ahooks';
import React, { useRef } from 'react';
import './index.less';
import SelectArea from './SelectArea';

interface IProps{
  loading: boolean;
}

export default function(props:IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <div className="mobile-simulator-container">
      {!props.loading && <SelectArea size={size} loading={props.loading}/>}
      <div className="mobile-simulator">
        <div className="mobile-head-bar"></div>
        <div className="mobile-content" id="mobile-content" ref={ref} />
      </div>
    </div>
  );
}
