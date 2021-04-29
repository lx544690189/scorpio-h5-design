import { componentBaseConfig } from '@/constant';
import FormRender, { useForm } from 'form-render';

import React, { useState } from 'react';
import { useModel } from 'umi';

const App = () => {
  const { pageSchema, selectComponent, setStateByObjectKeys } = useModel('bridge');
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    selectComponent.containerProps = values;
    setStateByObjectKeys({
      pageSchema: [...pageSchema],
    });
  };

  const form = useForm(selectComponent.containerProps ?? {});

  return (
    <FormRender
      form={form}
      schema={componentBaseConfig}
      // onChange={onChange}
      // onValidate={setValid}
      // showValidate={showValidate}
      displayType="row"
      onFinish={()=>{console.log();}}
      // useLogger
    />
  );
};

export default App;