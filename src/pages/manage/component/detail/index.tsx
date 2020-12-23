import { Avatar, Badge, Button, Card, Col, PageHeader, Row, Spin, Tabs } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from 'umi';
import Generator from 'fr-generator';
import React from 'react';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';

const { TabPane } = Tabs;
const { Meta } = Card;




const ComponentDetail = function() {

  function callback(key:string) {
    console.log(key);
  }

  return (
    <div className="manage-component-detail">
      <div className="left">
        <iframe src="/#/mobile" className="mobile" id="mobile"/>
      </div>
      <div className="right">
        <Tabs className="manage-component-detail-tabs" defaultActiveKey="1" onChange={callback}>
          <TabPane tab="表单项" key="1">
            <Form />
          </TabPane>
          <TabPane tab="schema配置" key="2">
            <Schema />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ComponentDetail;
