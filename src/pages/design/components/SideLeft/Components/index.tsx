import React from 'react';
import { Tabs, Select, notification } from 'antd';
import './index.less';
import { useModel } from 'umi';

const { TabPane } = Tabs;

const dataList = [{
  _id: '5efb06fb93f74734acf3ef2a',
  name: '优惠券1',
  cover: 'https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png',
  schema: {
    'x-component-props': {
      'size': 'medium',
      'labelAlign': 'left',
      'wrapperCol': 12,
      'labelTextAlign': 'right',
      'labelCol': 7,
    },
    'type': 'object',
    'properties': {
      'xx': {
        'type': 'string',
        'x-component': 'input',
        'x-component-props': {
          'addonTextBefore': '',
          'trim': true,
          'hasClear': true,
          'placeholder': '',
          'addonTextAfter': '',
        },
        'title': 'xx',
        'x-index': 0,
        'key': 'xx',
      },
    },
  },
}, {
  _id: '5f0bd86393f74734ac1d6bfd',
  name: '优惠券2',
  cover: 'https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png',
  schema: {
    'x-component-props': {
      'size': 'medium',
      'labelAlign': 'left',
      'wrapperCol': 12,
      'labelTextAlign': 'right',
      'labelCol': 7,
    },
    'type': 'object',
    'properties': {
      'xx': {
        'type': 'string',
        'x-component': 'input',
        'x-component-props': {
          'addonTextBefore': '',
          'trim': true,
          'hasClear': true,
          'placeholder': '',
          'addonTextAfter': '',
        },
        'title': 'xx',
        'x-index': 0,
        'key': 'xx',
      },
    },
  },
}];

export default function() {

  const { onDragStart, onDragEnd, pageSchema } = useModel('design');
  console.log(pageSchema);

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
            dataList.map((item) => (
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
