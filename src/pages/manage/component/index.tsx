import { Badge, Card, Empty, PageHeader, Spin, Tabs, Typography } from 'antd';
import { history, useRequest } from 'umi';

import React, { useState } from 'react';
import Model from './model';
import './index.less';
import FormRenderDrawer from '@/components/FormRenderDrawer';
import * as service from '@/service';

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
  };
  const onAddComponent = function(category:any){
    setComponentDraw({
      categoryId: category._id,
      visible: true,
      data: {},
    });
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
                        <Typography.Link key="id" onClick={()=>edit(component)}>info</Typography.Link>,
                        <Typography.Link key="edit" onClick={()=>edit(component)}>info</Typography.Link>,
                        <Typography.Link key="edit" onClick={()=>edit(component)}>dev</Typography.Link>,
                      ]}
                    >
                      <Meta
                        title={component.name}
                      />
                      <Paragraph copyable={{ text: 'Hello, Ant Design!' }} style={{fontSize: '12px', color: 'rgb(185 184 184)'}}>{component._id}</Paragraph>
                    </Card>
                  ))
                }
                <div className="manage-component-addCard" onClick={()=>onAddComponent(category)}>新增</div>
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
