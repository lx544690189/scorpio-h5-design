import React from 'react';
import { useModel } from 'umi';
import './index.less';
import SelectArea from './SelectArea';

export default function() {
  const { selectComponentRect } = useModel('bridge');

  return (
    <div className="mobile-simulator-container">
      {selectComponentRect && <SelectArea />}
      <div className="mobile-simulator">
        <div className="mobile-head-bar"></div>
        <div className="mobile-content" id="mobile-content" />
      </div>
    </div>
  );
}
