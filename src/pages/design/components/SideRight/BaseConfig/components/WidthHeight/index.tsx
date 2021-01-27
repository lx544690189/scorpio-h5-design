import { IMessageType, syncState } from '@/utils/bridge';
import { InputNumber } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import './index.less';

export default function() {
  const { selectComponent: {containerProps}, pageSchema, setStateByObjectKeys} = useModel('bridge');

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
