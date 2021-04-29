import React, { useEffect } from 'react';
import { useForm } from 'form-render';
import { useModel } from 'umi';
import FormRenderWithWidgets from '@/components/FormRenderWithWidgets';

const App = () => {
  const { pageSchema, selectComponent, setStateByObjectKeys } = useModel('bridge');
  const { generatorSchema, props } = selectComponent;
  const form = useForm();

  useEffect(() => {
    form.setValues(props);
  }, [props]);

  const watch = {
    '#': (values: any) => {
      selectComponent.props = values;
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