import React from 'react';
import { Tabs, notification, Row, Col } from 'antd';
import './index.less';
import { useModel } from 'umi';
import Model from '../model';

const { TabPane } = Tabs;

const Components = function() {

  const { onDragStart, onDragEnd, pageSchema } = useModel('bridge');
  const { queryAllWithComponent } = Model.useContainer();

  const dragStart = function(item: any) {
    if (pageSchema.length === 0) {
      notification.error({
        message: '请先创建一个页面',
        description: '创建页面后再进行组件拖拽操作！',
      });
    } else {
      onDragStart(item);
    }
  };

  const componentTree = queryAllWithComponent.data;

  return (
    <div className="components">
      <Tabs tabPosition="left">
        {
          componentTree && componentTree.map((category: any) => (
            <TabPane tab={category.name} key={category._id}>
              <Row gutter={10}>
                {
                  category.components.map((component: any) => (
                    <Col span={12} key={component._id}>
                      <div
                        className="components-item"
                        draggable
                        onDragStart={() => { dragStart(component); }}
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
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  );
};


export default Components;