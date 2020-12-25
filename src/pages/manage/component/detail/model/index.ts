import { useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { v4 as uuidv4 } from 'uuid';
import { IMessageType, onChildrenReady, syncState } from '@/utils/bridge';

export default createContainer(() => {
  const { setStateByObjectKeys } = useModel('bridge');
  const componentId = history.location.query.componentId;
  // state-组件详情
  const [componentDetailData, setComponentDetailData] = useState({
    _id: '',
    name: '',
    cover: '',
    generatorSchema: undefined,
  });
  // state- 组件props
  const componentDetail = useRequest(service.getComponentDetail, {
    defaultParams: [{
      componentId,
    }],
    onSuccess: (data) => {
      setComponentDetailData(data);
      const state = {
        pageSchema: [{
          components: [{
            _id: data._id,
            uuid: uuidv4(),
            name: data.name,
            cover: data.cover,
            schema: data.generatorSchema?.schema || {},
            props: {},
            containerProps: {},
          }],
        }],
        selectPageIndex: 0,
      };
      setStateByObjectKeys(state);
      onChildrenReady(() => {
        syncState({
          payload: state,
          from: 'componentEdit',
          type: IMessageType.syncState,
        });
      });
    },
  });

  return {
    componentDetail,
    componentDetailData,
    setComponentDetailData,
  };
});