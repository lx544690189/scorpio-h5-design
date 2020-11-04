import React from 'react';
import './index.less';

const BasicLayout: React.FC = (props) => {
  return <div className="app">{props.children}</div>;
};

export default BasicLayout;
