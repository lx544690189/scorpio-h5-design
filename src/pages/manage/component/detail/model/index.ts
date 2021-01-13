import { useState } from 'react';
import { useRequest, history, useModel } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { v4 as uuidv4 } from 'uuid';
import { IMessageType, onChildrenReady, syncState } from '@/utils/bridge';

export default createContainer(() => {
  const { setStateByObjectKeys } = useModel('bridge');
  // @ts-expect-error
  const componentId = <string>history.location.query.componentId;
  // state-组件详情
  const [componentDetailData, setComponentDetailData] = useState({
    _id: '',
    name: '',
    cover: '',
    generatorSchema: undefined,
    props: undefined,
    containerProps: undefined,
  });
  // state- 组件props
  const componentDetail = useRequest(service.queryComponentDetail, {
    defaultParams: [{
      _id: componentId,
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
            schema: data.generatorSchema?.schema ?? {},
            props: data.props ?? {},
            containerProps: data.containerProps ?? {},
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
  const editComponentDetailReq = useRequest(service.editComponent, {
    manual: true,
  });

  const onSubmit = async function(generatorSchema:any, props:any){
    await editComponentDetailReq.run({
      _id: componentDetailData._id,
      name: componentDetailData.name,
      cover: componentDetailData.cover,
      generatorSchema,
      props,
      containerProps: componentDetailData.containerProps,
    });
    history.goBack();
  };

  return {
    componentDetail,
    componentDetailData,
    setComponentDetailData,
    onSubmit,
  };
});