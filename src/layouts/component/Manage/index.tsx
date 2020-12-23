import { Menu, PageHeader } from 'antd';
import { history, useModel } from 'umi';
import { AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less';

export default function(props: any) {
  const { SubMenu } = Menu;

  const onMenuClick = function({key}:any) {
    history.push(key);
  };

  return (
    <div className="layout-manage">
      <div className="layout-manage-left">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onSelect={onMenuClick}
        >
          <Menu.Item key="/manage/page" icon={<PieChartOutlined />}>
            页面
          </Menu.Item>
          <Menu.Item key="/manage/category" icon={<PieChartOutlined />}>
            组件分类管理
          </Menu.Item>
          <Menu.Item key="/manage/component" icon={<PieChartOutlined />}>
            组件开发
          </Menu.Item>
        </Menu>
      </div>
      <div className="layout-manage-right">
        {props.children}
      </div>
    </div>
  );
}