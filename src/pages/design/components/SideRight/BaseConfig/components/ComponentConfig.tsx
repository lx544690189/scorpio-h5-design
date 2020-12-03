import SchemaForm, { createEffectHook, createFormActions } from '@formily/antd';
import { Input, Select, NumberPicker } from '@formily/antd-components';

import React from 'react';
import { useModel } from 'umi';

const App = () => {
  const { selectComponent } = useModel('design');
  console.log('selectComponent.schema: ', selectComponent.schema);
  return (
    <SchemaForm
      components={{ Input, Select, NumberPicker }}
      schema={selectComponent.schema}
      onSubmit={(values)=>{
        console.log(values);
      }}
    >
    </SchemaForm>
  );
};

export default App;