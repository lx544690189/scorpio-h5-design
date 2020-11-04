import React, { useState } from 'react';
//@ts-expect-error
import FormRender from 'form-render/lib/antd';
import './index.less';
import { Button } from 'antd';


const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      maxLength: 12,
    },
    number: {
      title: '数字',
      type: 'number',
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      'ui:width': '50%', // uiSchema 合并到 schema 中（推荐写法，书写便捷）
    },
  },
};
function Demo() {
  const [formData, setData] = useState({});
  return (
    <div className="dynamic-form">
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setData}
        displayType="row" // 详细配置见下
      />
    </div>
  );
}
export default Demo;