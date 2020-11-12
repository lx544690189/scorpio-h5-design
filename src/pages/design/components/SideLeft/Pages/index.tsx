import React, { useState } from 'react';
import { Skeleton, Switch, Card, Avatar, Empty, Button, Tooltip, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';
import CreatePage from './components/CreatePage';
import { useModel } from 'umi';

export default function() {
  const { openCreatePageDrawer, page: { pageSchema } } = useModel('page');
  console.log('pageSchema: ', pageSchema);

  return (
    <div className="page">

      {
        pageSchema.length === 0 ? (
          <>
            <div className="page-empty">
              <div className="page-empty-center">
                <Empty description="请先创建一个页面吧" />
                <Button type="primary" className="page-empty-new-btn" onClick={openCreatePageDrawer}>新增页面</Button>
              </div>
            </div>
            <CreatePage />
          </>
        ) : (
          pageSchema.map((item)=>(
            <Card
              key={item.config.path}
              className="page-card"
              cover={
                <img
                  alt="example"
                  src="https://carpooling-1256959311.cos.ap-chengdu.myqcloud.com/d6bc039b-04ea-49ca-8ee9-a006aec7c443.png"
                />
              }
              actions={[
                <Tooltip title="页面设置" key="setting">
                  <SettingOutlined />
                </Tooltip>,
                <Tooltip title="编辑" key="edit">
                  <EditOutlined />
                </Tooltip>,
              ]}
            >
              <div className="title">首页</div>
            </Card>
          ))

        )
      }
    </div>
  );
}
