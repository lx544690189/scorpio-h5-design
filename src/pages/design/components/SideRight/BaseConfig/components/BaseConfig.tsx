import SchemaForm, { createEffectHook, createFormActions } from '@formily/antd';
import { Input } from '@formily/antd-components';

import React from 'react';

const App = () => {
  return (
    <SchemaForm
      components={{ Input }}
      schema={{
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            'x-component': 'Input',
          },
        },
      }}
      onSubmit={(values)=>{
        console.log(values);
      }}
    >
    </SchemaForm>
  );
};

export default App;