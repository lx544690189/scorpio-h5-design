import { Card, Spin, Tabs } from 'antd';
import React, { useRef } from 'react';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';
import Model from './model';

const { TabPane } = Tabs;

const ComponentDetail = function() {
  const { componentDetail } = Model.useContainer();
  console.log('componentDetail: ', componentDetail.data);
  const SchemaRef = useRef(null);

  function onTabChange(key: string) {
    if (key === 'form') {
      // @ts-expect-error
      console.log('schema: ', SchemaRef.current.getValue());
    }
  }

  return (
    <div className="manage-component-detail">
      <div className="left">
        <iframe src="/#/mobile" className="mobile" id="mobile" />
      </div>
      <div className="right">
        <Tabs className="manage-component-detail-tabs" defaultActiveKey="1" onChange={onTabChange}>
          <TabPane tab="schema配置" key="schema">
            <Schema ref={SchemaRef} />
          </TabPane>
          <TabPane tab="表单项" key="form">
            <Form />
          </TabPane>
        </Tabs>
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
