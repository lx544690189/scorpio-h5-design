import React, { useEffect } from 'react';
import { Drawer, Button  } from 'antd';
import './index.less';
import 'antd/dist/antd.css';
import { useModel } from 'umi';
import {
  Form,
  FormItem,
  createAsyncFormActions,
} from '@formily/antd';
import {
  Input,
} from '@formily/antd-components'; // 或者@formily/next-components

const actions = createAsyncFormActions();

export default function() {
  const { page, closeConfigPageDrawer, onCreatePage, closeCreatePageDrawer } = useModel('page');
  useEffect(() => {
    actions.setFieldState('bb', (state) => {
      state.value = '11';
    });
  }, []);

  const submit1 = async() => {
    const validate = await actions.submit();
    console.log('values: ', validate.values);
    const {title, path} = validate.values;
    onCreatePage({
      config: {
        title,
        path,
      },
      components: [],
    });
    // actions.submit();
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
          <Button onClick={submit1} type="primary">
            确定
          </Button>
        </div>
      }
    >
      <Form actions={actions}>
        <FormItem
          label="页面标题"
          name="title"
          component={Input}
          labelCol={{ span: 6 }}
          required
        />
        <FormItem
          label="路径"
          name="path"
          component={Input}
          labelCol={{ span: 6 }}
          required
        />
      </Form>
    </Drawer>
  );
}
