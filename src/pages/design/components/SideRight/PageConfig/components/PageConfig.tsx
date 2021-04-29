import React, { useEffect } from 'react';
import { useForm } from 'form-render';
import { useModel } from 'umi';
import FormRenderWithWidgets from '@/components/FormRenderWithWidgets';

const App = () => {
  const { pageSchema, setStateByObjectKeys, selectPage } = useModel('bridge');
  const form = useForm();
  const { generatorSchema, props } = selectPage;

  useEffect(() => {
    form.setValues(props);
  }, [props]);

  const watch = {
    '#': (values: any) => {
      selectPage.props = values;
      setStateByObjectKeys({
        pageSchema: [...pageSchema],
      });
    },
  };

  return (
    <FormRenderWithWidgets
      form={form}
      watch={watch}
      {...generatorSchema}
    />
  );
};

export default App;