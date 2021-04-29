import React, { useEffect } from 'react';
import { useForm } from 'form-render';
import { useModel } from 'umi';
import './index.less';
import FormRenderWithWidgets from '@/components/FormRenderWithWidgets';

export default function() {
  const { pageSchema, setStateByObjectKeys, selectComponent } = useModel('bridge');
  const form = useForm();

  useEffect(() => {
    form.setValues(pageSchema[0].components[0].props || {});
  }, [pageSchema[0].components[0].props]);

  const watch = {
    '#': (values: any) => {
      pageSchema[0].components[0].props = values;
      setStateByObjectKeys({
        pageSchema: [...pageSchema],
      });
    },
  };

  return (
    <div className="manage-component-detail-form">
      <FormRenderWithWidgets
        form={form}
        watch={watch}
        {...selectComponent.generatorSchema}
      />
    </div>
  );
}
