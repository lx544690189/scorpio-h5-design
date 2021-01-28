import { Descriptions, InputNumber, Select } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import ColorPicker from '../ColorPicker';

export default function Border() {
  const { selectComponent, changeContainerPropsState } = useModel('bridge');
  const { containerProps } = selectComponent;
  const { color, fontSize, fontWeight } = containerProps;

  return (
    <Descriptions column={1}>
      <Descriptions.Item label="圆角">
        <div className="font-color-input">
          <ColorPicker onChange={(value: string) => { changeContainerPropsState('color', value); }} value={color ?? '#fff'} />
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
}
