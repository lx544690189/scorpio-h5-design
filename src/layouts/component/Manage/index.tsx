import { Menu, PageHeader } from 'antd';
import { history } from 'umi';
import { PieChartOutlined } from '@ant-design/icons';
import React from 'react';
import './index.less';

export default function(props: {
  children: React.ReactChild;
}) {

  const onMenuClick = function(key: string) {
    history.push(key);
  };

  return (
    <div className="layout-manage">
      <div className="layout-manage-left">
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          onSelect={(info) => { onMenuClick(info.key as string); }}
        >
          <Menu.Item key="/manage/page" icon={<PieChartOutlined />}>
            页面搭建
          </Menu.Item>
          {/* <Menu.Item key="/manage/pageTemplate" icon={<PieChartOutlined />}>
            页面模板
          </Menu.Item> */}
          <Menu.Item key="/manage/category" icon={<PieChartOutlined />}>
            组件分类
          </Menu.Item>
          <Menu.Item key="/manage/component" icon={<PieChartOutlined />}>
            组件开发（dev）
          </Menu.Item>
        </Menu>
      </div>
      <div className="layout-manage-right">
        {props.children}
      </div>
    </div>
  );
}