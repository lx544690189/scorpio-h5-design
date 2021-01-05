import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import './index.less';
import { DrawerProps } from 'antd/lib/drawer';
import FormRender from 'form-render/lib/antd';

interface IProps extends DrawerProps {
  type: 'add' | 'edit' | 'detail';
  onCancel: () => void;
  onSubmit: () => void;
  schema: any;
  formData: any;
}
const TITLE_MAP = {
  add: '新增',
  edit: '编辑',
  detail: '详情',
};

export default function(props: IProps) {
  const { type, onCancel, onSubmit, schema, formData } = props;
  const title = TITLE_MAP[type];
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const beforeSubmit = () => {
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    console.log('values: ', values);
  };

  return (
    <Drawer
      className="form-render-drawer"
      title={title}
      width={500}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" onClick={beforeSubmit}>
            确定
          </Button>
        </div>
      }
      {...props}
    >
      <FormRender
        schema={schema}
        formData={props}
        onChange={onChange}
        onValidate={setValid}
        showValidate={showValidate}
        displayType="row"
        useLogger
      />
    </Drawer>
  );
}
