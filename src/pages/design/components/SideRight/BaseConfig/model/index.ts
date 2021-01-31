import { useEffect } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';
import { createContainer } from 'unstated-next';

export default createContainer(() => {
  const { pageSchema, selectPageIndex, selectComponentId } = useModel('bridge');
  const component = pageSchema[selectPageIndex].components.find((item:any)=>item.uuid === selectComponentId);

  useEffect(()=>{
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