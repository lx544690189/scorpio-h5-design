import SchemaForm from '@formily/antd';
import { Input, Select, NumberPicker } from '@formily/antd-components';

import React from 'react';
import { useModel } from 'umi';

const App = () => {
  return (
    <SchemaForm
      components={{ Input, Select, NumberPicker }}
      onSubmit={(values)=>{
        console.log(values);
      }}
    >
    </SchemaForm>
  );
};

export default App;