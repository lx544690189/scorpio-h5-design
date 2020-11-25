import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.less';

const BasicLayout: React.FC = (props) => {

  return (
    <ConfigProvider locale={zhCN} >
      <div className="app">{props.children}</div>
    </ConfigProvider>
  );
};

export default BasicLayout;
