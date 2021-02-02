import React from 'react';
import { Tabs, Empty } from 'antd';
import './index.less';
import ComponentConfig from './ComponentConfig';
import { useModel } from 'umi';
import BaseLayoutConfig from '@/components/BaseLayoutConfig';

const { TabPane } = Tabs;

export default function() {
  const { selectComponentId } = useModel('bridge');

  if (!selectComponentId) {
    return <Empty description="请选取组件后配置" />;
  }
  return (
    <Tabs defaultActiveKey="1" type="card" className="config-tabs">
      <TabPane tab="基础属性" key="1">
        <BaseLayoutConfig />
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
