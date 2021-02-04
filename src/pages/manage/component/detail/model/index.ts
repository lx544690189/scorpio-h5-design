import { useEffect } from 'react';
import { useRequest, history, useModel } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { v4 as uuidv4 } from 'uuid';
import { childrenModel, IMessageType, syncState } from '@/utils/bridge';
import { useBoolean } from 'ahooks';
import { sleep } from '@/utils';
import Postmate from 'Postmate';

export default createContainer(() => {
  const { setStateByObjectKeys, selectComponent } = useModel('bridge');
  const [loading, setLoading] = useBoolean(true);
  // @ts-expect-error
  const componentId = <string>history.location.query.componentId;
  // state- 组件props
  const componentDetail = useRequest(service.queryComponentDetail, {
    defaultParams: [{
      _id: componentId,
    }],
    onSuccess: async(data) => {
      setLoading.setTrue();
      await sleep(100);
      const selectComponentId = uuidv4();
      const state = {
        pageSchema: [{
          components: [{
            _id: data._id,
            uuid: selectComponentId,
            name: data.name,
            cover: data.cover,
            generatorSchema: data.generatorSchema ?? {
              schema: {
                type: 'object',
                properties: {
                },
              },
              displayType: 'row',
              showDescIcon: true,
              labelWidth: 120,
            },
            props: data.props ?? {},
            containerProps: data.containerProps ?? {
              margin: {},
              padding: {},
            },
          }],
        }],
        selectPageIndex: 0,
        selectComponentId,
      };
      setStateByObjectKeys(state, false);
      await sleep(100);
      const handshake = new Postmate({
        container: document.getElementById('mobile-content'),
        url: '/#/mobile',
        name: 'mobile',
        classListArray: ['mobile'],
      });
      handshake.then((child:any) => {
        window.postmate_mobile = child;
        syncState({
          payload: state,
          type: IMessageType.syncState,
        });
        child.on(childrenModel.SYNC_STATE, (message:any) => {
          setStateByObjectKeys(message, false);
        });
        setLoading.setFalse();
      });
    },
  });
  const editComponentDetailReq = useRequest(service.editComponent, {
    manual: true,
  });

  useEffect(()=>{
    return ()=>{
      window.postmate_mobile.destroy();
    };
  }, []);

  const onSubmit = async function(){
    await editComponentDetailReq.run(selectComponent);
    history.goBack();
  };

  return {
    componentDetail,
    onSubmit,
    loading,
  };
});