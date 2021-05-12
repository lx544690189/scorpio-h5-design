import React, { useEffect } from 'react';
import { useForm } from 'form-render';
import { useModel } from 'umi';
import FormRenderWithWidgets from '@/components/FormRenderWithWidgets';
import { IComponentSchema } from '@/types/schema';

const App = () => {
  const { pageSchema, selectComponent, setStateByObjectKeys } = useModel('bridge');
  const component = selectComponent as IComponentSchema;
  const { generatorSchema, props } = component;
  const form = useForm();

  useEffect(() => {
    form.setValues(props);
  }, [props]);

  const watch = {
    '#': (values: any) => {
      component.props = values;
      setStateByObjectKeys({
        pageSchema: [...pageSchema],
      });
    },
  };

  return (
    // @ts-expect-error
    <FormRenderWithWidgets
      form={form}
      watch={watch}
      {...generatorSchema}
    />
  );
};

export default App;