import { componentBaseConfig } from '@/constant';
import { EVENT_TYPE } from '@/types/event';
import { postMessageToMobile } from '@/utils';
import FormRender from 'form-render/lib/antd';

import React, { useState } from 'react';
import { useModel } from 'umi';

const App = () => {
  const { pageSchema, selectPageIndex, selectComponentId, setPageSchema } = useModel('design');
  const component = pageSchema[selectPageIndex].components.find((item:any)=>item.uuid === selectComponentId);
  const {containerProps} = component;
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length === 0) {
    }
  };

  const onChange = (values: any) => {
    console.log('values: ', values);
    component.containerProps = values;
    setPageSchema([...pageSchema]);
    postMessageToMobile({
      type: EVENT_TYPE.page_edit,
      payload: {
        pageSchema: pageSchema,
        selectPageIndex,
      },
    });
  };

  return (
    <FormRender
      schema={componentBaseConfig}
      formData={containerProps}
      onChange={onChange}
      onValidate={setValid}
      showValidate={showValidate}
      displayType="row"
      useLogger
    />
  );
};

export default App;