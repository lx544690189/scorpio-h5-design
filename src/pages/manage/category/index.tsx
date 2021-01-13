import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select, PageHeader, Space, Divider, Typography, Popconfirm } from 'antd';
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
  const [form] = Form.useForm();
  const [edit, setEdit] = useState<{
    visible: boolean,
    data: any,
    type: string,
  }>({
    visible: false,
    data: {},
    type: 'add',
  });
  const { tableProps, search, refresh } = useAntdTable(service.getCategoryList, {
    form,
    defaultParams: [
      { current: 1, pageSize: 10 },
      {
        sort: { createdAt: -1 },
      },
    ],
    formatResult(res){
      res.data.list.forEach((item:any)=>delete item.children);
      return res.data;
    },
  });
  const addCategoryReq = useRequest(service.addCategory, {
    manual: true,
  });
  const editCategoryReq = useRequest(service.editCategory, {
    manual: true,
  });
  const deleteCategoryReq = useRequest(service.deleteCategory, {
    manual: true,
  });
  const { submit, reset } = search;

  const add = function(){
    setEdit({
      visible: true,
      data: {},
      type: 'add',
    });
  };
  const cancel = function(){
    setEdit({
      visible: false,
      data: {},
      type: 'add',
    });
  };
  const confirm =async function(values: any){
    if(edit.type === 'add'){
      await addCategoryReq.run(values);
    }
    if(edit.type === 'edit'){
      await editCategoryReq.run({
        _id: edit.data._id,
        name: values.name,
      });
    }
    setEdit({
      visible: false,
      data: {},
      type: 'add',
    });
    await refresh();
  };
  const onEdit = function(data:any){
    setEdit({
      visible: true,
      data,
      type: 'edit',
    });
  };
  const onDelelte = async function(data:any){
    await deleteCategoryReq.run({
      _id: data._id,
    });
    setEdit({
      visible: false,
      data: {},
      type: 'add',
    });
    await refresh();
  };
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 180,
      render(data:any){
        return (
          <Space split={<Divider type="vertical" />}>
            <Typography.Link onClick={()=>{onEdit(data);}}>修改</Typography.Link>
            <Popconfirm
              title="确认此操作？"
              onConfirm={()=>{onDelelte(data);}}
              okText="确认"
              cancelText="取消"
            >
              <Typography.Link type="danger">删除</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const SearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="分类名称" name="name">
              <Input placeholder="name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              重置
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
  return (
    <PageHeader
      className="manage-category"
      ghost={false}
      onBack={() => null}
      title="组件分类管理"
      extra={[
        <Button key="1" type="primary" onClick={add}>
          新增
        </Button>,
      ]}
    >
      {SearchForm}
      <Table columns={columns} rowKey="_id" {...tableProps} />
      <FormRenderDrawer
        // @ts-expect-error
        type={edit.type}
        visible={edit.visible}
        onCancel={cancel}
        formSchema={formSchema}
        onSubmit={confirm}
        loading={addCategoryReq.loading}
        formData={edit.data}
      />
    </PageHeader>
  );
}

