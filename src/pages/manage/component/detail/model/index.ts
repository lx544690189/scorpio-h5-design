import { useState } from 'react';
import { useRequest, history } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';

export default createContainer(() => {
  const componentId = history.location.query.componentId;
  const componentDetail = useRequest(service.getComponentDetail, {
    defaultParams: [{
      componentId,
    }],
    initialData: {
      name: '',
      cover: '',
      mschema: {},
    },
  });
  const [generatorSchema, setGeneratorSchema] = useState({
    schema: {
      type: 'object',
      properties: {
      },
    },
    displayType: 'row',
    showDescIcon: true,
    labelWidth: 120,
  });

  return {
    generatorSchema,
    setGeneratorSchema,
    componentDetail,
  };
});