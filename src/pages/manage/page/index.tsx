import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select, PageHeader, Space, Divider, Typography, Popconfirm, Card, Pagination } from 'antd';
import { useAntdTable } from 'ahooks';
import * as service from '@/service';
import './index.less';
import FormRenderDrawer from '@/components/FormRenderDrawer';
import { useRequest } from 'umi';

const formSchema = {
  'schema': {
    'type': 'object',
    'properties': {
      'name': {
        'title': '分类名称',
        'type': 'string',
        'ui:options': {},
      },
    },
    'ui:displayType': 'row',
    'ui:showDescIcon': true,
    'required': ['name'],
  },
  'displayType': 'row',
  'showDescIcon': true,
};

export default function() {
  return (
    <PageHeader
      className="manage-page"
      ghost={false}
      title="页面搭建"
      // extra={[
      //   <Button key="1" type="primary" onClick={add}>
      //     新增
      //   </Button>,
      // ]}
    >
      <div className="manage-page-container">
        <div className="manage-page-item">
          <Card
            className="page-card"
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
        </div>
        <div className="manage-page-item">
          <Card
            className="page-card"
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
        </div>
        <div className="manage-page-item">
          <Card
            className="page-card"
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
        </div>
        <div className="manage-page-item">
          <Card
            className="page-card"
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
        </div>
        <div className="manage-page-item">
          <Card
            className="page-card"
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
        </div>
      </div>
      <div className="manage-page-pagination">
        <Pagination defaultCurrent={1} total={50} />
      </div>

    </PageHeader>
  );
}

