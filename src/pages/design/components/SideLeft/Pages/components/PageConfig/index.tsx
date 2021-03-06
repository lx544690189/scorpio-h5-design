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
import { v4 as uuidv4 } from 'uuid';
import { page_generatorSchema } from '@/constant';

const actions = createAsyncFormActions();
const pageNumber = 1;

export default function() {
  const { pageSchema } = useModel('bridge');
  const { page, closeConfigPageDrawer, onCreatePage } = useModel('page');
  useEffect(() => {
    if(page.configModalVisible){
      actions.setFieldState('title', (state) => {
        state.value = `页面-${pageSchema.length + 1}`;
      });
      actions.setFieldState('path', (state) => {
        state.value = uuidv4();
      });
    }
  }, [page.configModalVisible]);

  const submit1 = async() => {
    const validate = await actions.submit();
    const {title, path} = validate.values;
    onCreatePage({
      config: {
        title,
        path,
      },
      generatorSchema: page_generatorSchema,
      props: {
        title,
        path,
        isHome: true,
        backgroundColor: '#fff',
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
