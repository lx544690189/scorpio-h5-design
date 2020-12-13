import React from 'react';
import { Tabs, Empty } from 'antd';
import './index.less';
import BaseConfig from './BaseConfig';
import ComponentConfig from './ComponentConfig';
import { useModel } from 'umi';

const { TabPane } = Tabs;

export default function() {
  const { selectComponentId } = useModel('design');

  if (!selectComponentId) {
    return <Empty description="请选取组件后配置" />;
  }
  return (
    <Tabs defaultActiveKey="1" type="card">
      <TabPane tab="基础属性" key="1">
        <BaseConfig />
      </TabPane>
      <TabPane tab="组件配置" key="2">
        <ComponentConfig />
      </TabPane>
      <TabPane tab="事件" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
}
