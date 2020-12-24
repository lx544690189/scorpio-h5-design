import { IMessageType, syncState } from '@/utils/bridge';
import FormRender from 'form-render/lib/antd';

import React, { useState } from 'react';
import { useModel } from 'umi';

const App = () => {
  const { pageSchema, selectPageIndex, selectComponentId, setStateByObjectKeys } = useModel('bridge');
  const component = pageSchema[selectPageIndex].components.find((item:any)=>item.uuid === selectComponentId);
  const {schema, props} = component;
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    component.props = values;
    const state = {
      pageSchema: [...pageSchema],
    };
    setStateByObjectKeys(state);
    syncState({
      payload: state,
      from: 'design',
      type: IMessageType.syncState,
    });
  };

  return (
    <FormRender
      schema={schema}
      formData={props}
      onChange={onChange}
      onValidate={setValid}
      showValidate={showValidate}
      displayType="row"
      useLogger
    />
  );
};

export default App;