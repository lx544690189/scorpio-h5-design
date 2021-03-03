/* eslint-disable @typescript-eslint/no-var-requires */
import { Badge, Button, Card, Empty, PageHeader, Spin, Tabs, Tooltip, Typography, message, Menu, Dropdown, Modal } from 'antd';
import { history, useRequest } from 'umi';
import React, { useState } from 'react';
import Model from './model';
import './index.less';
import FormRenderDrawer from '@/components/FormRenderDrawer';
import * as service from '@/service';
import { PlusOutlined, DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import h5Lib from '@/h5Lib';

const { TabPane } = Tabs;
const { Paragraph } = Typography;
const { confirm } = Modal;

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
        'ui:widget': 'ImageUpload',
      },
      'editor': {
        'title': '富文本',
        'type': 'string',
        'ui:widget': 'BraftEditor',
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
  const { queryAllWithComponent } = Model.useContainer();
  const [componentDraw, setComponentDraw] = useState({
    category: {},
    component: {},
    visible: false,
    data: {},
  });
  const addComponentReq = useRequest(service.addComponent, {
    manual: true,
  });
  const editComponentReq = useRequest(service.editComponent, {
    manual: true,
  });
  const deleteComponentReq = useRequest(service.deleteComponent, {
    manual: true,
  });

  const edit = function({ _id }: any) {
    history.push(`/manage/component/detail?componentId=${_id}`);
  };

  const onCancel = function() {
    setComponentDraw({
      category: {},
      component: {},
      visible: false,
      data: {},
    });
  };
  const onSubmit = async function(values: any) {
    // @ts-expect-error
    if(!componentDraw.component._id){
      await addComponentReq.run({
        // @ts-expect-error
        categoryId: componentDraw.category._id,
        ...values,
      });
    }else{
      await editComponentReq.run({
        // @ts-expect-error
        _id: componentDraw.component._id,
        ...values,
      });
    }
    setComponentDraw({
      category: {},
      component: {},
      visible: false,
      data: {},
    });
    await queryAllWithComponent.refresh();
  };
  const onAddComponent = function(category: any) {
    setComponentDraw({
      category,
      component: {},
      visible: true,
      data: {},
    });
  };

  const copyId = function(component: any) {
    //
  };

  const dev = async function(component: any) {
    // @ts-expect-error
    if(!h5Lib[component._id]){
      return message.error('组件不存在，请检查本地h5lib目录');
    }
    history.push(`/manage/component/detail?componentId=${component._id}`);
  };

  const onEditComponent = function(component: any, category: any){
    setComponentDraw({
      category,
      visible: true,
      data: {...component},
      component,
    });
  };

  const onDeleteComponent = function(component: any) {
    confirm({
      title: '确认删除此组件?',
      icon: <ExclamationCircleOutlined />,
      content: '请确保组件未被其他页面引用',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async()=> {
        await deleteComponentReq.run({
          _id: component._id,
        });
        await queryAllWithComponent.refresh();
      },
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
      <Spin spinning={queryAllWithComponent.loading}>
        <Tabs tabPosition='left'>
          {
            queryAllWithComponent.data.map((category: any) => (
              <TabPane tab={<>{category.name}<Badge count={category.components.length} /></>} key={category._id}>
                <Button
                  type="dashed"
                  block
                  className="manage-component-add-btn"
                  icon={<PlusOutlined />}
                  onClick={() => onAddComponent(category)}
                >新增</Button>
                {
                  category.components.map((component: any) => (
                    <Card
                      key={component._id}
                      className="manage-component-card"
                      // cover={
                      //   component.cover ? <img
                      //     alt="example"
                      //     src={component.cover}
                      //   /> : <Empty description={false} />
                      // }
                      actions={[
                        <Tooltip title={`ID：${component._id}`} key="id">
                          <Typography.Link onClick={() => copyId(component)}>ID</Typography.Link>
                        </Tooltip>,
                        <Typography.Link key="edit" onClick={() => dev(component)}>组件开发</Typography.Link>,
                        <Dropdown
                          key="more"
                          trigger={['click']}
                          overlay={
                            <Menu>
                              <Menu.Item key="0" onClick={() => { onEditComponent(component, category); }}>
                                编辑
                              </Menu.Item>
                              <Menu.Item key="1" onClick={() => { onDeleteComponent(component); }}>删除</Menu.Item>
                            </Menu>
                          }
                        >
                          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            更多 <DownOutlined />
                          </a>
                        </Dropdown>,
                      ]}
                    >
                      <div className="manage-component-card-img">
                        <img src={component.cover} />
                      </div>
                      <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                        {component.name}
                      </Paragraph>
                    </Card>
                  ))
                }
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
