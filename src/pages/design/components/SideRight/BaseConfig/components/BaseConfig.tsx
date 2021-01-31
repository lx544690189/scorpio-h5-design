import { componentBaseConfig } from '@/constant';
import FormRender from 'form-render/lib/antd';

import React, { useState } from 'react';
import { useModel } from 'umi';

const App = () => {
  const { pageSchema, selectPageIndex, selectComponentId, setStateByObjectKeys } = useModel('bridge');
  const component = pageSchema[selectPageIndex].components.find((item:any)=>item.uuid === selectComponentId);
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    component.containerProps = values;
    setStateByObjectKeys({
      pageSchema: [...pageSchema],
    });
  };

  return (
    <FormRender
      schema={componentBaseConfig}
      formData={component.containerProps ?? {}}
      onChange={onChange}
      onValidate={setValid}
      showValidate={showValidate}
      displayType="row"
      useLogger
    />
  );
};

export default App;