import { Badge, Button, PageHeader, Tabs } from 'antd';
import React from 'react';
import Model from './model';
import './index.less';

const { TabPane } = Tabs;

const Index = function() {
  const counter = Model.useContainer();

  const addCategory = function(){
    counter.increment();
  };

  return (
    <PageHeader
      className="manage-component"
      ghost={false}
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="1" type="primary" onClick={addCategory}>
          添加组件类型
        </Button>,
      ]}
    >
      <Tabs tabPosition='left'>
        <TabPane tab={<>基础组件<Badge count={4} /></>} key="1">
        Content of Tab 1{counter.count}
        </TabPane>
        <TabPane tab="优惠券" key="2">
        Content of Tab 2
        </TabPane>
      </Tabs>
    </PageHeader>
  );
};

export default function(){
  return (
    <Model.Provider>
      <Index/>
    </Model.Provider>
  );
}
