import React, { forwardRef } from 'react';
// @ts-expect-error
import Generator, {defaultSettings, defaultCommonSettings} from 'fr-generator';
import './index.less';
import ImageUpload from '@/widgets/ImageUpload';
import BraftEditor from '@/widgets/BraftEditor';
import { useModel } from 'umi';

const defaultValue = {
  schema: {
    type: 'object',
    properties: {
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

export default forwardRef((props: any, ref: any) => {
  const { selectComponent } = useModel('bridge');

  return (
    <div className="manage-component-detail-schema">
      <Generator
        ref={ref}
        defaultValue={selectComponent?.generatorSchema || defaultValue}
        // templates={[]}
        extraButtons={[false, false, false, false]}
        widgets={{ ImageUpload, BraftEditor }}
        settings={[
          ...defaultSettings,
          {
            title: '扩展表单',
            widgets: [
              {
                text: '图片',
                name: 'image',
                schema: {
                  title: '图片',
                  type: 'string',
                  'ui:widget': 'ImageUpload',
                },
                'widget': 'ImageUpload',
                setting: {
                  $id: {
                    description: '数据存储的名称/英文/必填',
                    title: 'ID',
                    type: 'string',
                    'ui:widget': 'idInput',
                  },
                },
              }, {
                text: '富文本',
                name: 'richText',
                schema: {
                  title: '富文本',
                  type: 'string',
                  'ui:widget': 'BraftEditor',
                },
                'widget': 'BraftEditor',
                setting: {
                  $id: {
                    description: '数据存储的名称/英文/必填',
                    title: 'ID',
                    type: 'string',
                    'ui:widget': 'idInput',
                  },
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
});
