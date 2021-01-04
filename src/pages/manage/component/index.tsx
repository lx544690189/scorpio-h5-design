import { Avatar, Badge, Button, Card, Col, PageHeader, Row, Spin, Tabs } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { history } from 'umi';

import React from 'react';
import Model from './model';
import './index.less';

const { TabPane } = Tabs;
const { Meta } = Card;

const Component = function() {
  const { getCategoryList } = Model.useContainer();
  const { list } = getCategoryList.data;

  const edit = function({_id}: any){
    history.push(`/manage/component/detail?componentId=${_id}`);
  };

  return (
    <PageHeader
      className="manage-component"
      ghost={false}
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="1" type="primary">
          添加组件类型
        </Button>,
      ]}
    >
      <Spin spinning={getCategoryList.loading}>
        <Tabs tabPosition='left'>
          {
            list.map((category: any) => (
              <TabPane tab={<>{category.categoryName}<Badge count={category.children.length} /></>} key={category._id}>
                <Row>
                  {
                    category.children.map((component: any) => (
                      <Col key={component._id} md={12} xl={8}>
                        <Card
                          className="manage-component-card"
                          cover={
                            <img
                              alt="example"
                              src={component.cover}
                            />
                          }
                          actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" onClick={()=>edit(component)}/>,
                          ]}
                        >
                          <Meta
                            title={component.name}
                          />
                        </Card>
                      </Col>
                    ))
                  }
                </Row>
              </TabPane>
            ))
          }
        </Tabs>
      </Spin>
    </PageHeader>
  );
};

export default function() {
  return (
    <Model.Provider>
      <Component />
    </Model.Provider>
  );
}
