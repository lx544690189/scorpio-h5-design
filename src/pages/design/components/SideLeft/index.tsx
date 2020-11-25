import React from 'react';
import classnames from 'classnames';
import { Tabs, Select, Space } from 'antd';

import './index.less';
import { useModel } from 'umi';
import { SIDES_MENU } from '@/types/layout';
import Pages from './Pages';
import Construct from './Construct';
import Components from './Components';

const { TabPane } = Tabs;

export default function() {

  const { side, setSide } = useModel('layout');
  console.log('side: ', side);

  return (
    <div className="side-left">
      <div className="side-left-nav">
        <ul className="side-left-nav-list">
          <li className={classnames({active: side.menu === SIDES_MENU.page})} onClick={()=>{setSide({menu: SIDES_MENU.page});}}>
            <i className="iconfont icon-yemian1" />
            <div className="title">页面</div>
          </li>
          <li className={classnames({active: side.menu === SIDES_MENU.structure})}  onClick={()=>{setSide({menu: SIDES_MENU.structure});}}>
            <i className="iconfont icon-shuxingjiegou" />
            <div className="title">结构</div>
          </li>
          <li className={classnames({active: side.menu === SIDES_MENU.component})}  onClick={()=>{setSide({menu: SIDES_MENU.component});}}>
            <i className="iconfont icon-zujian" />
            <div className="title">组件</div>
          </li>
        </ul>
      </div>
      <div className="side-left-content">
        {side.menu === SIDES_MENU.page && <Pages />}
        {side.menu === SIDES_MENU.structure && <Construct />}
        {side.menu === SIDES_MENU.component && <Components />}
      </div>
    </div>
  );
}
