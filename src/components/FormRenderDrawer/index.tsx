import React, { useEffect, useState } from 'react';
import { Drawer, Button } from 'antd';
import './index.less';
import { DrawerProps } from 'antd/lib/drawer';
import FormRender from 'form-render/lib/antd';

interface IProps extends DrawerProps {
  type: 'add' | 'edit' | 'detail';
  onCancel: () => void;
  onSubmit: (values:any) => void;
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
  const [valid, setValid] = useState([]);
  const [value, setValue] = useState({});
  const [showValidate, setShowValidate] = useState(false);

  useEffect(()=>{
    if(visible){
      console.log('formData: ', formData);
      setValue(formData || {});
    }
  }, [visible]);

  const beforeSubmit = () => {
    setShowValidate(true);
    if (valid.length === 0) {
      onSubmit(value);
    }
  };

  const onChange = (values: any) => {
    setValue(values);
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
          <Button type="primary" onClick={beforeSubmit} loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <FormRender
        formData={value}
        onChange={onChange}
        onValidate={setValid}
        showValidate={showValidate}
        {...formSchema}
      />
    </Drawer>
  );
}
