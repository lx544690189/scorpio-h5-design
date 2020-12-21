import React, { useEffect } from 'react';
import './index.less';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import { EVENT_TYPE } from '@/types/event';
import { useModel } from 'umi';
import { doChildrenReady } from '@/utils';
import Header from './components/Header';

export default function() {
  const { setSelectComponentId, setPageSchema, setSelectPageIndex } = useModel('design');
  useEffect(() => {
    // postmessage同步状态
    if (location.href.includes('/design')) {
      window.addEventListener('message', (event) => {
        if (event.data && event.data.type !== undefined) {
          const { type, payload } = event.data;
          console.log('p------------------p');
          console.log(payload);
          console.log('p------------------p');
          /** 选择组件 */
          if (type === EVENT_TYPE.component_select) {
            const { componentId } = payload;
            setSelectComponentId(componentId);
          }
          /** 页面编辑 */
          if (type === EVENT_TYPE.page_edit) {
            const { pageSchema, selectPageIndex } = payload;
            setPageSchema(pageSchema);
            setSelectPageIndex(selectPageIndex);
          }
          if (type === EVENT_TYPE.children_ready) {
            doChildrenReady();
          }
        }
      }, false);
    }
  }, []);

  return (
    <div className="design">
      <Header />
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