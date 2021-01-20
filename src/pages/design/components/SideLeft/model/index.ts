import { useEffect } from 'react';
import { useModel, useRequest } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { SIDES_MENU } from '@/types/layout';

export default createContainer(() => {
  const { side} = useModel('layout');
  const queryAllWithComponent = useRequest(service.queryAllWithComponent, {
    manual: true,
  });

  useEffect(()=>{
    if(side.menu === SIDES_MENU.component && !queryAllWithComponent.data){
      queryAllWithComponent.run();
    }
  }, [side.menu]);

  return {
    queryAllWithComponent,
  };
});