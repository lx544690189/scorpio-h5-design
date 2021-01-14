import React from 'react';
import { Tabs, Select, notification } from 'antd';
import './index.less';
import { useModel, useRequest } from 'umi';
import { componentSchema_1, componentSchema_2 } from '@/constant';
import * as service from '@/service';

const { TabPane } = Tabs;

export default function() {

  const { onDragStart, onDragEnd, pageSchema } = useModel('bridge');
  const queryAllWithComponentReq = useRequest(service.queryAllWithComponent, {
    cacheKey: 'queryAllWithComponent',
  });
  console.log(queryAllWithComponentReq.loading);

  const dragStart = function(item:any){
    if(pageSchema.length === 0){
      notification.error({
        message: '请先创建一个页面',
        description:
          '创建页面后再进行组件拖拽操作！',
      });
    }else{
      onDragStart(item);
    }
  };

  return (
    <div className="components">
      <Tabs tabPosition="left">
        <TabPane tab="基础组件" key="1">
          {
            [componentSchema_1, componentSchema_2].map((item) => (
              <div
                key={item._id}
                className="components-demo"
                draggable
                onDragStart={()=>{dragStart(item);}}
                onDragEnd={onDragEnd}
              >
                <img src={item.cover} />
                <div className="components-name">{item.name}</div>
              </div>
            ))
          }
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
