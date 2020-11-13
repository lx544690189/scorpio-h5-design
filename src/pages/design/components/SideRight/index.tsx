import React from 'react';
import { Tabs } from 'antd';
import './index.less';
import BaseConfig from './BaseConfig';

const { TabPane } = Tabs;

export default function() {

  return (
    <Tabs defaultActiveKey="1" type="card">
      <TabPane tab="基础属性" key="1">
        <BaseConfig />
      </TabPane>
      <TabPane tab="组件配置" key="2">
      Content of Tab Pane 2
      </TabPane>
      <TabPane tab="事件" key="3">
      Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
}
