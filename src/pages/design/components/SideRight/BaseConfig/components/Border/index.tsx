import { Descriptions, InputNumber, Radio } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import ColorPicker from '../ColorPicker';

export default function Border() {
  const { selectComponent, changeContainerPropsState } = useModel('bridge');
  const { containerProps } = selectComponent;
  const { borderColor, borderWidth, borderStyle, borderRadius } = containerProps;

  return (
    <Descriptions column={1}>
      <Descriptions.Item label="圆角">
        <InputNumber
          formatter={(value) => `${value}px`}
          parser={(value) => (value ?? '').replace('px', '')}
          value={borderRadius ?? 0}
          onChange={(value) => { changeContainerPropsState('borderRadius', value); }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="样式">
        <Radio.Group
          size="small"
          options={[
            { label: '无边框', value: 'none' },
            { label: '实线', value: 'solid' },
            { label: '虚线', value: 'dashed' },
            { label: '点线', value: 'dotted' },
          ]}
          onChange={(e) => { changeContainerPropsState('borderStyle', e.target.value); }}
          value={borderStyle ?? 'none'}
          optionType="button"
          buttonStyle="solid"
        />
      </Descriptions.Item>
      <Descriptions.Item label="宽度">
        <InputNumber
          formatter={(value) => `${value}px`}
          parser={(value) => (value ?? '').replace('px', '')}
          value={borderWidth ?? 0}
          onChange={(value) => { changeContainerPropsState('borderWidth', value); }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="颜色">
        <ColorPicker
          onChange={(value: string) => { changeContainerPropsState('borderColor', value); }}
          value={borderColor}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
