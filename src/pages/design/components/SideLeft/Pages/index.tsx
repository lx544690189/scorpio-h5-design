import React from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


import './index.less';

export default function() {

  return (
    <div className="page">
      <Card
        className="page-card"
        cover={
          <img
            alt="example"
            src="https://static.ccrgt.com/images/82ab171c-a600-434f-aafb-3724006e1c92.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
        ]}
      >
        <div className="title">首页</div>
      </Card>
    </div>
  );
}
