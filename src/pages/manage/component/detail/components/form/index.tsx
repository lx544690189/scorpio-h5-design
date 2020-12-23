import FormRender from 'form-render/lib/antd';
import React, { useState } from 'react';
import './index.less';

export default function() {
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);
  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    console.log('values: ', values);
  };
  return (
    <div className="manage-component-detail-form">

      <FormRender
        schema={{
          'type': 'object',
          'properties': {
            'string': {
              'title': '字符串',
              'type': 'string',
            },
            'select': {
              'title': '单选',
              'type': 'string',
              'enum': [
                'a',
                'b',
                'c',
              ],
              'enumNames': [
                '选项1',
                '选项2',
                '选项3',
              ],
            },
          },
        }}
        formData={{}}
        onChange={onChange}
        displayType="row"
        onValidate={setValid}
        showValidate={showValidate}
        useLogger
      />
    </div>
  );
}
