import { InputNumber } from 'antd';
import React from 'react';
import './index.less';

export default function() {

  function onChange(value:any) {
    console.log('changed', value);
  }

  return (
    <div className="layout-width-height">
      <InputNumber
        defaultValue={750}
        formatter={(value) => `宽 ${value}`}
        parser={(value:any) => value.replace('宽', '')}
        onChange={onChange}
      />
    </div>
  );
}
