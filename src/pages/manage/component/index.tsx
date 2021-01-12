/* eslint-disable @typescript-eslint/no-var-requires */
import { Badge, Button, Card, Empty, PageHeader, Spin, Tabs, Tooltip, Typography, message } from 'antd';
import { history, useRequest } from 'umi';
import React, { useState } from 'react';
import Model from './model';
import './index.less';
import FormRenderDrawer from '@/components/FormRenderDrawer';
import * as service from '@/service';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Meta } = Card;
const { Paragraph } = Typography;

const formSchema = {
  'schema': {
    'type': 'object',
    'properties': {
      'name': {
        'title': '组件名称',
        'type': 'string',
      },
      'cover': {
        'title': '封面',
        'type': 'string',
      },
    },
    'ui:displayType': 'row',
    'ui:showDescIcon': true,
    'required': ['name'],
  },
  'displayType': 'row',
  'showDescIcon': true,
};

const Component = function() {
  const { getCategoryList } = Model.useContainer();
  const { list } = getCategoryList.data;
  const [componentDraw, setComponentDraw] = useState({
    categoryId: '',
    visible: false,
    data: {},
  });
  const addComponentReq = useRequest(service.addComponent, {
    manual: true,
  });

  const edit = function({_id}: any){
    history.push(`/manage/component/detail?componentId=${_id}`);
  };

  const onCancel = function(){
    setComponentDraw({
      categoryId: '',
      visible: false,
      data: {},
    });
  };
  const onSubmit = async function(values:any){
    await addComponentReq.run({
      categoryId: componentDraw.categoryId,
      component: values,
    });
    setComponentDraw({
      categoryId: '',
      visible: false,
      data: {},
    });
    await getCategoryList.refresh();
  };
  const onAddComponent = function(category:any){
    setComponentDraw({
      categoryId: category._id,
      visible: true,
      data: {},
    });
  };

  const copyId = function(component:any){
    //
  };

  const dev = function(component:any){
    try {
      require(`@/h5Lib/${component._id}/index.tsx`).default;
      history.push(`/manage/component/detail?componentId=${component._id}`);
    } catch (error) {
      message.error('组件不存在，请检查本地h5lib目录');
    }
  };

  return (
    <PageHeader
      className="manage-component"
      ghost={false}
      onBack={() => null}
      title="组件开发"
      subTitle="开发流程：申请组件ID->h5Lib目录下新增组件->组件开发页面编辑、测试"
    >
      <Spin spinning={getCategoryList.loading}>
        <Tabs tabPosition='left'>
          {
            list.map((category: any) => (
              <TabPane tab={<>{category.categoryName}<Badge count={category.children.length} /></>} key={category._id}>
                {
                  category.children.map((component: any) => (
                    <Card
                      key={component._id}
                      className="manage-component-card"
                      cover={
                        component.cover ? <img
                          alt="example"
                          src={component.cover}
                        /> : <Empty description={false} />
                      }
                      actions={[
                        <Tooltip title={`ID：${component._id}`} key="id">
                          <Typography.Link  onClick={()=>copyId(component)}>ID</Typography.Link>
                        </Tooltip>,
                        <Typography.Link key="edit" onClick={()=>edit(component)}>info</Typography.Link>,
                        <Typography.Link key="edit" onClick={()=>dev(component)}>dev</Typography.Link>,
                      ]}
                    >
                      <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                        <Meta
                          title={component.name}
                        />
                      </Paragraph>
                    </Card>
                  ))
                }
                <Button
                  type="dashed"
                  block
                  className="manage-component-add-btn"
                  icon={<PlusOutlined />}
                  onClick={()=>onAddComponent(category)}
                >新增</Button>
              </TabPane>
            ))
          }
        </Tabs>
      </Spin>
      <FormRenderDrawer
        type="add"
        visible={componentDraw.visible}
        onCancel={onCancel}
        formSchema={formSchema}
        onSubmit={onSubmit}
        loading={addComponentReq.loading}
        formData={componentDraw.data}
      />
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
