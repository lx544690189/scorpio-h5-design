import React from 'react';
import { Skeleton, Switch, Card, Avatar, Empty, Button, Tooltip, Drawer, Row, Col } from 'antd';
import './index.less';
import { useModel } from 'umi';

const pageSchema = {
  // 基本配置
  config: {
    // 页面标题
    title: '页面标题',
    // 封面
    cover: 'https://static.ccrgt.com/images/82ab171c-a600-434f-aafb-3724006e1c92.png',
    // 路径
    path: 'home',
    // 分享
    share: {
      type: [1, 2],
      desc: '邀请好友助力',
    },
  },
  components: [],
};

export default function() {
  const { page, closeCreatePageDrawer, onCreatePage } = useModel('page');

  return (
    <Drawer
      className="page-add"
      title="新增页面-选择页面模板"
      placement="left"
      onClose={closeCreatePageDrawer}
      visible={page.visible}
      getContainer={false}
      style={{ position: 'absolute' }}
      width={430}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={12} onClick={()=>{onCreatePage(pageSchema);}}>
          <Card
            className="page-add-card"
            cover={
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description=""/>
            }
          >
            <div className="title">空白页面</div>
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          <Card
            className="page-add-card"
            cover={
              <img
                className="page-add-card-img"
                alt="example"
                src="https://static.ccrgt.com/images/82ab171c-a600-434f-aafb-3724006e1c92.png"
              />
            }
          >
            <div className="title">输入手机号领券</div>
          </Card>
        </Col>
      </Row>
    </Drawer>
  );
}
