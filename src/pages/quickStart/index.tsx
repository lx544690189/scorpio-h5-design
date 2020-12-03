import { TEMPLATE_TYPE } from '@/types';
import { Button } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import './index.less';

export default function() {

  const {onCreateTemplate} = useModel('quickStart');

  return (
    <div className="quickStart">
      <Button type="dashed" onClick={()=>{onCreateTemplate(TEMPLATE_TYPE.blank);}}>测试-创建空白模板</Button>
      <Button type="dashed" onClick={()=>{onCreateTemplate(TEMPLATE_TYPE.example);}}>测试-创建示例模板</Button>
    </div>
  );
}
