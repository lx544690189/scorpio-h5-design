import { useRequest, history, useModel } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';
import { v4 as uuidv4 } from 'uuid';
import { IMessageType, onChildrenReady, syncState } from '@/utils/bridge';
import { useBoolean } from 'ahooks';
import { sleep } from '@/utils';

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
      await sleep(100);
      const selectComponentId = uuidv4();
      const state = {
        pageSchema: [{
          components: [{
            _id: data._id,
            uuid: selectComponentId,
            name: data.name,
            cover: data.cover,
            schema: data.generatorSchema?.schema ?? {},
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
      setStateByObjectKeys(state);
      onChildrenReady(async() => {
        syncState({
          payload: state,
          from: 'componentEdit',
          type: IMessageType.syncState,
        });
        setLoading.setFalse();
      });
      await sleep(100);
      // @ts-expect-error
      window.document.querySelector('#mobile').src='/#/mobile';
      console.log('window.document.', window.document.querySelector('#mobile'));
    },
  });
  const editComponentDetailReq = useRequest(service.editComponent, {
    manual: true,
  });

  const onSubmit = async function(generatorSchema:any){
    const {_id, name, cover, containerProps, props}  =selectComponent;
    await editComponentDetailReq.run({
      _id,
      name,
      cover,
      generatorSchema,
      props,
      containerProps,
    });
    history.goBack();
  };

  return {
    componentDetail,
    onSubmit,
    loading,
  };
});