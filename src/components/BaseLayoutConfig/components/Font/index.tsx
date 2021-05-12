import { Descriptions, InputNumber, Select } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import ColorPicker from '../ColorPicker';

export default function Font() {
  const { selectComponent, changeContainerPropsState } = useModel('bridge');
  const { color, fontSize, fontWeight } = selectComponent?.containerProps ?? {};

  return (
    <Descriptions column={1}>
      <Descriptions.Item label="颜色">
        <div className="font-color-input">
          <ColorPicker onChange={(value: string) => { changeContainerPropsState('color', value); }} value={color ?? '#fff'} />
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="字号">
        <div className="font-size-weight">
          <Select
            value={fontWeight ?? 100}
            style={{ width: 120 }}
            onChange={(value) => { changeContainerPropsState('fontWeight', value); }}
          >
            <Select.Option value={100}>普通</Select.Option>
            <Select.Option value={800}>粗体</Select.Option>
          </Select>
          <InputNumber
            formatter={(value) => `${value}px`}
            parser={(value) => Number((value ?? '').replace('px', ''))}
            value={fontSize ?? 30}
            onChange={(value) => { changeContainerPropsState('fontSize', value); }}
          />
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
}
