import { Menu, PageHeader } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less';

export default function(props: any) {
  const { SubMenu } = Menu;

  return (
    <div className="layout-manage">
      <div className="layout-manage-left">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            页面
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            组件
          </Menu.Item>
        </Menu>
      </div>
      <div className="layout-manage-right">
        {props.children}
      </div>
    </div>
  );
}