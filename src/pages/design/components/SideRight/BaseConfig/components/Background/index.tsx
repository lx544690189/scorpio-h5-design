import { Descriptions, Radio } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import ImageUpload from '@/widgets/ImageUpload';
import ColorPicker from '../ColorPicker';

enum FILL_TYPE {
  color,
  image,
}

export default function Background() {
  const { selectComponent, changeContainerPropsState } = useModel('bridge');
  const { containerProps } = selectComponent;
  const { backgroundImage, backgroundColor, backgroundSize, backgroundRepeat } = containerProps;

  const [backgroundFillType, setBackgroundFillType] = useState(FILL_TYPE.color);

  return (
    <Descriptions column={1}>
      <Descriptions.Item label="填充">
        <div className="background">
          <Radio.Group
            size="small"
            options={[
              { label: '颜色填充', value: FILL_TYPE.color },
              { label: '背景图片', value: FILL_TYPE.image },
            ]}
            onChange={(e) => { setBackgroundFillType(e.target.value); }}
            value={backgroundFillType}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </Descriptions.Item>
      {backgroundFillType === FILL_TYPE.color && (
        <Descriptions.Item label="填充颜色">
          <ColorPicker
            className="background-color"
            onChange={(value: string) => { changeContainerPropsState('backgroundColor', value); }}
            value={backgroundColor}
          />
        </Descriptions.Item>
      )}
      {backgroundFillType === FILL_TYPE.image && (
        <>
          <Descriptions.Item label="图片">
            <ImageUpload
              value={backgroundImage}
              onChange={(name, value) => { console.log('value: ', value);changeContainerPropsState('backgroundImage', value); }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="尺寸">
            <Radio.Group
              style={{ marginTop: 4 }}
              size="small"
              options={[
                { label: '默认', value: 'initial' },
                { label: '充满', value: '100% 100%' },
                { label: '等比填充', value: 'contain' },
                { label: '等比覆盖', value: 'cover' },
              ]}
              onChange={(e) => { changeContainerPropsState('backgroundSize', e.target.value); }}
              value={backgroundSize ?? 'initial'}
              optionType="button"
              buttonStyle="solid"
            />
          </Descriptions.Item>
          <Descriptions.Item label="重复">
            <Radio.Group
              style={{ marginTop: 4 }}
              size="small"
              options={[
                { label: '默认', value: 'initial' },
                { label: '水平重复', value: 'repeat-x' },
                { label: '垂直重复', value: 'repeat-y' },
                { label: '不重复', value: 'no-repeat' },
              ]}
              onChange={(e) => { changeContainerPropsState('backgroundRepeat', e.target.value); }}
              value={backgroundRepeat ?? 'initial'}
              optionType="button"
              buttonStyle="solid"
            />
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
}
