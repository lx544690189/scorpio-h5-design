import React from 'react';
import { Tabs, Empty } from 'antd';
import './index.less';
import BaseConfig from './BaseConfig';
import { useModel } from 'umi';

const { TabPane } = Tabs;

export default function() {
  // const { selectComponent } = useModel('design');
  const selectComponent = {
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
  };

  if (!selectComponent) {
    return <Empty description="请选取组件后配置" />;
  }
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
