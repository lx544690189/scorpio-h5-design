import React from 'react';
import './index.less';

export default function() {
  return (
    <div className="design-header">
      <ul className="design-header-operations">
        <li>
          <i className="iconfont icon-baocun" />
          <div className="text">保存</div>
        </li>
        <li>
          <i className="iconfont icon-shouji" />
          <div className="text">预览</div>
        </li>
        <li>
          <i className="iconfont icon-json" />
          <div className="text">导出</div>
        </li>
      </ul>
    </div>
  );
}
