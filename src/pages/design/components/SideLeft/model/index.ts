import { useEffect } from 'react';
import { useModel, useRequest } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { SIDES_MENU } from '@/types/layout';

export default createContainer(() => {
  const { side, setSide } = useModel('layout');
  const queryAllWithComponent = useRequest(service.queryAllWithComponent, {
    manual: true,
  });

  useEffect(()=>{
    console.log('side: ', side);
    if(side.menu === SIDES_MENU.component){
      if(!queryAllWithComponent.data){
        queryAllWithComponent.run();
      }
    }
  }, [side]);

  return {
    queryAllWithComponent,
  };
});