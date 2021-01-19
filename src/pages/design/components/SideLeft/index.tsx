import React from 'react';
import classnames from 'classnames';
import { Tabs, Select, Space } from 'antd';

import './index.less';
import { useModel } from 'umi';
import { SIDES_MENU } from '@/types/layout';
import Pages from './Pages';
import Construct from './Construct';
import Components from './Components';
import Model from './model';

const { TabPane } = Tabs;

const SlideLeft = function()  {

  const { side, setSide } = useModel('layout');
  const menus = [{
    title: '页面',
    menuType: SIDES_MENU.page,
    component: Pages,
    icon: 'icon-yemian1',
  }, {
    title: '结构',
    menuType: SIDES_MENU.structure,
    component: Construct,
    icon: 'icon-shuxingjiegou',
  }, {
    title: '组件',
    menuType: SIDES_MENU.component,
    component: Components,
    icon: 'icon-zujian',
  }];

  const currentMenu = menus.find((item)=>item.menuType === side.menu);

  return (
    <div className="side-left">
      <div className="side-left-nav">
        <ul className="side-left-nav-list">
          {
            menus.map((item) => (
              <li
                className={classnames({ active: side.menu === item.menuType })}
                onClick={() => { setSide({ menu: item.menuType }); }}
                key={item.menuType}
              >
                <i className={`iconfont ${item.icon}`} />
                <div className="title">{item.title}</div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="side-left-content">
        {currentMenu && <currentMenu.component/ >}
      </div>
    </div>
  );
};

export default function() {
  return (
    <Model.Provider>
      <SlideLeft />
    </Model.Provider>
  );
}