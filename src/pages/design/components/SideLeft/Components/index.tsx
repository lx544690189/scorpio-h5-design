import React from 'react';
import { Tabs, Select, Space } from 'antd';
import './index.less';
import { useModel } from 'umi';

const { TabPane } = Tabs;

export default function() {

  const { onDragStart, onDragEnd, onDrop } = useModel('drag');

  return (
    <div className="components">
      <Tabs tabPosition="left">
        <TabPane tab="基础组件" key="1">
          <div
            className="components-demo"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
          >
            <img src="https://static.ccrgt.com/images/e8e03bce-4972-44d9-a1a8-9af619d2e6e7.png"/>
          </div>
          <div
            className="components-demo"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <img src="https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png"/>
          </div>
        </TabPane>
        <TabPane tab="测试" key="2">
          <div
            className="component-box"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            drag
          </div>
          <div className="component-box">组件2</div>
          <div className="component-box">组件3</div>
          <div className="component-box">组件4</div>
          <div className="component-box">组件5</div>
        </TabPane>
      </Tabs>
    </div>
  );
}
