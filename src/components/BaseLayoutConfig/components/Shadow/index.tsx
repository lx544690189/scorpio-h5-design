import { Descriptions, InputNumber, Radio, Select } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import ColorPicker from '../ColorPicker';

enum BOX_SHADOW_TYPE {
  outside,
  inset,
}

export default function Shadow() {
  const { selectComponent, changeContainerPropsState } = useModel('bridge');
  const { containerProps } = selectComponent;
  const { boxShadow } = containerProps ?? {};

  let computedBoxShadow = boxShadow;
  if (!boxShadow) {
    computedBoxShadow = 'rgba(255,255,255,0) 0px 0px 0px 0px';
  }
  const arrayBoxShadow = computedBoxShadow.split(' ');
  const boxShadowType = /inset/.test(boxShadow) ? BOX_SHADOW_TYPE.inset : BOX_SHADOW_TYPE.outside;
  const [color, boxShadowX, boxShadowY, boxShadowRadius] = arrayBoxShadow;

  const onBoxShadowTypeChange = function(type: BOX_SHADOW_TYPE) {
    let changedBoxShadow;
    if (type === BOX_SHADOW_TYPE.outside) {
      changedBoxShadow = arrayBoxShadow.slice(0, 4).join(' ');
    }
    if (type === BOX_SHADOW_TYPE.inset) {
      changedBoxShadow = `${arrayBoxShadow.slice(0, 4).join(' ')} inset`;
    }
    changeContainerPropsState('boxShadow', changedBoxShadow);
  };

  const changeShadowState = function(index: number, value: string | number | undefined) {
    arrayBoxShadow[index] =index === 0 ? value : `${value ?? 0}px`;
    changeContainerPropsState('boxShadow', arrayBoxShadow.join(' '));
  };

  return (
    <Descriptions column={1}>
      <Descriptions.Item label="类型">
        <Radio.Group
          size="small"
          options={[
            { label: '外阴影', value: BOX_SHADOW_TYPE.outside },
            { label: '内阴影', value: BOX_SHADOW_TYPE.inset },
          ]}
          onChange={(e) => { onBoxShadowTypeChange(e.target.value); }}
          value={boxShadowType}
          optionType="button"
          buttonStyle="solid"
        />
      </Descriptions.Item>
      <Descriptions.Item label="颜色">
        <ColorPicker
          className="background-color"
          onChange={(value: string) => { changeShadowState(0, value); }}
          value={color}
        />
      </Descriptions.Item>
      <Descriptions.Item label="X轴">
        <InputNumber
          formatter={(value) => `${value}px`}
          parser={(value) => (value ?? '').replace('px', '')}
          value={boxShadowX.replace('px', '')}
          onChange={(value) => { changeShadowState(1, value); }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Y轴">
        <InputNumber
          formatter={(value) => `${value}px`}
          parser={(value) => (value ?? '').replace('px', '')}
          value={boxShadowY.replace('px', '')}
          onChange={(value) => { changeShadowState(2, value); }}
        />
      </Descriptions.Item>
      <Descriptions.Item label="半径">
        <InputNumber
          formatter={(value) => `${value}px`}
          parser={(value) => (value ?? '').replace('px', '')}
          value={boxShadowRadius.replace('px', '')}
          onChange={(value) => { changeShadowState(3, value); }}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
