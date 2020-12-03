import React, { useEffect } from 'react';
import './index.less';
import DynamicForm from '../../components/DynamicForm';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import { EVENT_TYPE } from '@/types/event';
import { useModel } from 'umi';

export default function() {
  const { setSelectComponent } = useModel('design');
  useEffect(() => {
    // postmessage同步状态
    if (location.href.includes('/design')) {
      window.addEventListener('message', (event) => {
        if (event.data && event.data.type !== undefined) {
          const { type, payload } = event.data;
          console.log('p------------------p');
          console.log(payload);
          console.log('p------------------p');
          /** 放置组件 */
          if (type === EVENT_TYPE.component_select) {
            const { component } = payload;
            setSelectComponent(component);
          }
        }
      }, false);
    }
  }, []);

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