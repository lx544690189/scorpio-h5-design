import { useSize } from 'ahooks';
import React, { useRef } from 'react';
import { useModel } from 'umi';
import './index.less';
import SelectArea from './SelectArea';

export default function() {
  const { selectComponentRect } = useModel('bridge');
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <div className="mobile-simulator-container">
      {selectComponentRect && <SelectArea size={size}/>}
      <div className="mobile-simulator">
        <div className="mobile-head-bar"></div>
        <div className="mobile-content" id="mobile-content" ref={ref} />
      </div>
    </div>
  );
}
