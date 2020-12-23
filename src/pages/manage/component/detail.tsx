import { Avatar, Badge, Button, Card, Col, PageHeader, Row, Spin, Tabs } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from 'umi';
import Generator from 'fr-generator';


import React from 'react';
import Model from './model';
import './index.less';

const { TabPane } = Tabs;
const { Meta } = Card;

const defaultValue = {
  schema: {
    type: 'object',
    properties: {
      inputName: {
        title: '简单输入框',
        type: 'string',
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};
const templates = [
  {
    text: '模板1',
    name: 'something',
    schema: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        inputName: {
          title: '简单输入框',
          type: 'string',
        },
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        dateName: {
          title: '时间选择',
          type: 'string',
          format: 'date',
        },
      },
    },
  },
];


const Component = function() {
  const { getCategoryList } = Model.useContainer();

  return (
    <div>
      <Generator
        defaultValue={defaultValue}
        templates={templates}
        extraButtons={[true, true, true, true,
          {
            text: '保存',
            onClick: () => {
              // alert(1);
            },
          },
        ]}
      />
    </div>
  );
};

export default function() {
  return (
    <Model.Provider>
      <Component />
    </Model.Provider>
  );
}
