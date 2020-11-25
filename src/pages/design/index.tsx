import React, { useEffect } from 'react';
import './index.less';
import DynamicForm from '../../components/DynamicForm';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';

export default function() {

  return (
    <div className="design">
      <div className="header">
        <i className="iconfont icon-shuxingjiegou" />
      </div>
      <SideLeft />
      <div className="side-right">
        <SideRight />
      </div>
      <div className="center">
        <iframe src="/#/mobile" className="mobile" id="mobile"/>
      </div>
    </div>
  );
}