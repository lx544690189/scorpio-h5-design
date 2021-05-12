import { componentBaseConfig } from '@/constant';
import FormRender, { useForm } from 'form-render';

import React, { useState } from 'react';
import { useModel } from 'umi';

const App = () => {
  const { pageSchema, selectComponent, setStateByObjectKeys } = useModel('bridge');

  // @ts-expect-error
  const form = useForm(selectComponent?.containerProps ?? {});

  return (
    <FormRender
      form={form}
      schema={componentBaseConfig}
      displayType="row"
      onFinish={() => { console.log(); }}
    />
  );
};

export default App;