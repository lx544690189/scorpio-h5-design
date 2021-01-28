import { Collapse, Descriptions, InputNumber, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import MarginPadding from './components/MarginPadding';
import Background from './components/Background';
import Font from './components/Font';
import Border from './components/Border';
import Shadow from './components/Shadow';


const { Panel } = Collapse;
export default function BaseConfig() {

  return (
    <div className="design-config-base">
      <Collapse defaultActiveKey={[1, 2, 3, 4, 5]}>
        <Panel header="布局" key={1}>
          <Descriptions column={1}>
            {/* <Descriptions.Item label="宽高">
              <WidthHeight />
            </Descriptions.Item> */}
            <Descriptions.Item label="边距">
              <MarginPadding />
            </Descriptions.Item>
          </Descriptions>
        </Panel>
        <Panel header="文字" key={2}>
          <Font />
        </Panel>
        <Panel header="背景" key={3}>
          <Background />
        </Panel>
        <Panel header="边框" key={4}>
          <Border />
        </Panel>
        <Panel header="阴影" key={5}>
          <Shadow />
        </Panel>
      </Collapse>
    </div>
  );
}
