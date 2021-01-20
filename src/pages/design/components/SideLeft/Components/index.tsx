import React from 'react';
import { Tabs, notification, Row, Col } from 'antd';
import './index.less';
import { useModel } from 'umi';
import Model from '../model';

const { TabPane } = Tabs;

const Components = function()  {

  const { onDragStart, onDragEnd, pageSchema } = useModel('bridge');
  const { queryAllWithComponent } = Model.useContainer();

  const dragStart = function(item:any){
    if(pageSchema.length === 0){
      notification.error({
        message: '请先创建一个页面',
        description: '创建页面后再进行组件拖拽操作！',
      });
    }else{
      onDragStart(item);
    }
  };

  const componentTree = queryAllWithComponent.data;

  return (
    <div className="components">
      <Tabs tabPosition="left">
        {
          componentTree && componentTree.map((category: any)=>(
            <TabPane tab={category.name} key={category._id}>
              <Row gutter={10}>
                {
                  category.components.map((component:any) => (
                    <Col span={12} key={component._id}>
                      <div
                        className="components-item"
                        draggable
                        onDragStart={()=>{dragStart(component);}}
                        onDragEnd={onDragEnd}
                      >
                        <div className="components-item-img">
                          <img src={component.cover} />
                        </div>
                        <div className="components-name">{component.name}</div>
                      </div>
                    </Col>
                  ))
                }
              </Row>
              {/* <div className="components-list">
                {
                  category.components.map((component:any) => (
                    <div
                      key={component._id}
                      className="components-item"
                      draggable
                      onDragStart={()=>{dragStart(component);}}
                      onDragEnd={onDragEnd}
                    >
                      <div className="components-item-img"><img src={component.cover} /></div>
                      <div className="components-name">{component.name}</div>
                    </div>
                  ))
                }
              </div> */}
            </TabPane>
          ))
        }
        {/* <TabPane tab="基础组件" key="1">
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
        </TabPane> */}
      </Tabs>
    </div>
  );
};


export default Components;