import React, { useEffect } from 'react';
import { Drawer, Button } from 'antd';
import './index.less';
import 'antd/dist/antd.css';
import { useForm } from 'form-render';
import { useModel } from 'umi';
import { v4 as uuidv4 } from 'uuid';
import { page_generatorSchema } from '@/constant';
import FormRenderWithWidgets from '@/components/FormRenderWithWidgets';

const schema = {
  'type': 'object',
  'properties': {
    'title': {
      'title': '页面标题',
      'type': 'string',
      'required': true,
    },
    'path': {
      'title': '路径',
      'type': 'string',
      'required': true,
    },
  },
};

export default function() {
  const { pageSchema } = useModel('bridge');
  const { page, closeConfigPageDrawer, onCreatePage } = useModel('page');
  useEffect(() => {
    if (page.configModalVisible) {
      form.setValues({
        title: `页面-${pageSchema.length + 1}`,
        path: uuidv4(),
      });
    }
  }, [page.configModalVisible]);
  const form = useForm();

  const onFinish = function(formData: Record<string, unknown>, errors:any[]) {
    if (errors.length === 0) {
      onCreatePage({
        config: formData,
        generatorSchema: page_generatorSchema,
        props: {
          ...formData,
          isHome: true,
          backgroundColor: '#fff',
        },
        components: [],
      });
    }
  };

  return (
    <Drawer
      className="page-config"
      title="页面配置"
      placement="left"
      onClose={closeConfigPageDrawer}
      visible={page.configModalVisible}
      getContainer={false}
      style={{ position: 'absolute' }}
      width={420}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={closeConfigPageDrawer} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={form.submit} type="primary">
            确定
          </Button>
        </div>
      }
    >
      <FormRenderWithWidgets
        form={form}
        schema={schema}
        onFinish={onFinish}
      />
    </Drawer>
  );
}
