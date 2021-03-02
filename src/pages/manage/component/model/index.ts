import { useState } from 'react';
import { useRequest } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { fetchH5LibComponents } from '@/utils';

export default createContainer(() => {
  const queryAllWithComponent = useRequest(service.queryAllWithComponent, {
    initialData: [],
  });
  const [asyncComponents, setAsyncComponents] = useState({});

  const getH5LibComponents = async function(_id:string){
    // @ts-expect-error
    if(asyncComponents[_id]){
      // @ts-expect-error
      return asyncComponents[_id];
    }
    const rc = await fetchH5LibComponents(_id);
    return rc;
  };

  return {
    queryAllWithComponent,
    getH5LibComponents,
  };
});