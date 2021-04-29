import React, { useEffect } from 'react';
import { Drawer, Button } from 'antd';
import './index.less';
import { DrawerProps } from 'antd/lib/drawer';
import FormRender, { useForm } from 'form-render';
import ImageUpload from '@/widgets/ImageUpload';
import BraftEditor from '@/widgets/BraftEditor';

interface IProps extends DrawerProps {
  type: 'add' | 'edit' | 'detail';
  onCancel: () => void;
  onSubmit: (values: any) => void;
  formSchema: any;
  formData: any;
  loading?: boolean;
}
const TITLE_MAP = {
  add: '新增',
  edit: '编辑',
  detail: '详情',
};

export default function(props: IProps) {
  const { type, onCancel, onSubmit, formSchema, formData, visible, loading } = props;
  const title = TITLE_MAP[type];
  const form = useForm();

  useEffect(() => {
    if (visible) {
      if (formData) {
        form.setValues(formData);
      } else {
        form.resetFields();
      }
    }
  }, [visible]);

  const onFinish = (formData: Record<string, unknown>, valid: Error[]) => {
    if (valid.length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <Drawer
      className="form-render-drawer"
      title={title}
      width={500}
      maskClosable={true}
      visible={visible}
      onClose={onCancel}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" onClick={form.submit} loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <FormRender
        form={form}
        onFinish={onFinish}
        widgets={{ ImageUpload, BraftEditor }}
        {...formSchema}
      />
    </Drawer>
  );
}
