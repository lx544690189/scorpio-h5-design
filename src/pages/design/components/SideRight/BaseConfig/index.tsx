import { Collapse, Descriptions} from 'antd';
import React from 'react';
import './index.less';
import MarginPadding from './components/MarginPadding';
import WidthHeight from './components/WidthHeight';
import { SketchPicker } from 'react-color';


const { Panel } = Collapse;

export default function BaseConfig() {

  return (
    <div className="design-config-base">
      <Collapse defaultActiveKey={[1, 2, 3]}>
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
          <Descriptions column={1}>
            <Descriptions.Item label="颜色">
              <div className="font-color-input">
                <SketchPicker />
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Panel>
        <Panel header="定位" key={3}>
          <p>33</p>
        </Panel>
      </Collapse>
    </div>
  );
}
