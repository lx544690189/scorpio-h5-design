import React from 'react';
import { Tabs, Empty } from 'antd';
import './index.less';
import ComponentConfig from './ComponentConfig';
import PageConfig from './PageConfig';
import { useModel } from 'umi';
import BaseLayoutConfig from '@/components/BaseLayoutConfig';

const { TabPane } = Tabs;

export default function() {
  const { selectComponent, selectPage } = useModel('bridge');

  return (
    <Tabs defaultActiveKey="componentConfig" type="card" className="config-tabs">
      <TabPane tab="页面配置" key="pageConfig">
        {selectPage ? <PageConfig /> : <Empty description="请新建一个页面后配置" /> }
      </TabPane>
      <TabPane tab="组件配置" key="componentConfig">
        {selectComponent ? <ComponentConfig /> : <Empty description="请选取组件后配置组件" /> }
      </TabPane>
      <TabPane tab="外层容器配置" key="containerConfig">
        {selectComponent ? <BaseLayoutConfig /> : <Empty description="请选取组件后配置外层容器" /> }
      </TabPane>
      <TabPane tab="事件" key="3">
        开发中...
      </TabPane>
    </Tabs>
  );
}
