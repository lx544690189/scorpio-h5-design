import { Tabs } from 'antd';
import React, { useEffect, useRef } from 'react';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';
import Model from './model';
import { doChildrenReady, IMessage, IMessageType } from '@/utils/bridge';
import { useModel } from 'umi';

const { TabPane } = Tabs;

const ComponentDetail = function() {
  const { setStateByObjectKeys } = useModel('bridge');
  const { componentDetailData, setComponentDetailData } = Model.useContainer();
  const SchemaRef = useRef(null);

  useEffect(() => {
    registerPostmessageEventListener();
  }, []);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function(){
    window.addEventListener('message', (event) => {
      if (event.data && event.data.from === 'mobile') {
        const { payload, type } = event.data as IMessage;
        console.log('--------componentEdit----------');
        console.log(payload);
        console.log('--------componentEdit----------');
        if(type === IMessageType.syncState){
          setStateByObjectKeys(payload);
        }
        if(type === IMessageType.children_ready){
          doChildrenReady();
        }
      }
    });
  };

  function onTabChange(key: string) {
    if (key === 'form') {
      // @ts-expect-error
      const generatorSchema = SchemaRef.current.getValue();
      console.log('generatorSchema: ', generatorSchema);
      setComponentDetailData({
        ...componentDetailData,
        generatorSchema,
      });
    }
  }

  return (
    <div className="manage-component-detail">
      <div className="left">
        <iframe src="/#/mobile" className="mobile" id="mobile" />
      </div>
      <div className="right">
        {/* <Spin spinning={componentDetail.loading}> */}
        <Tabs className="manage-component-detail-tabs" defaultActiveKey="1" onChange={onTabChange}>
          <TabPane tab="schema配置" key="schema">
            <Schema ref={SchemaRef} />
          </TabPane>
          <TabPane tab="表单项" key="form">
            <Form />
          </TabPane>
        </Tabs>
        {/* </Spin> */}
      </div>
    </div>
  );
};

export default function() {
  return (
    <Model.Provider>
      <ComponentDetail />
    </Model.Provider>
  );
}
