import { useEffect } from 'react';
import { useState } from 'react';
import { useModel, useRequest } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';

export default createContainer(() => {
  const { pageSchema, selectPageIndex, selectComponentId } = useModel('bridge');
  const component = pageSchema[selectPageIndex].components.find((item:any)=>item.uuid === selectComponentId);
  console.log('component1: ', component);

  useEffect(()=>{
    console.log('component: ', component);
  }, [component]);

  const [config, setConfig]=useState({
    margin: {
      top: '',
      right: '',
      bottom: '',
      left: '',
    },
    padding: {
      top: '',
      right: '',
      bottom: '',
      left: '',
    },
  });

  return {
    config,
    setConfig,
  };
});