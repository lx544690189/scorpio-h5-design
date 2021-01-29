import { IMessageType, syncState } from '@/utils/bridge';
import FormRender from 'form-render/lib/antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import ImageUpload from '@/widgets/ImageUpload';
import './index.less';

export default function() {
  const { pageSchema, setStateByObjectKeys, selectComponent } = useModel('bridge');
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  let formData = {};
  if (pageSchema.length === 1 && pageSchema[0].components.length === 1) {
    formData = pageSchema[0].components[0].props;
  }
  console.log('formData: ', formData);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    console.log('values: ', values);
    pageSchema[0].components[0].props = values;
    const state = {
      pageSchema: [...pageSchema],
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'componentEdit',
      type: IMessageType.syncState,
    });
  };
  return (
    <div className="manage-component-detail-form">
      <FormRender
        formData={formData}
        onChange={onChange}
        onValidate={setValid}
        showValidate={showValidate}
        widgets={{ ImageUpload }}
        {...selectComponent.generatorSchema}
      />
    </div>
  );
}
