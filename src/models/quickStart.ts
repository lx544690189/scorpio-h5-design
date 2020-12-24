import { TEMPLATE_TYPE } from '@/types';
import { history, useModel } from 'umi';
import { pageSchema } from '@/constant';
import { IMessageType, onChildrenReady } from '@/utils/bridge';
import { syncState } from '@/utils/bridge';

export default function useAuthModel() {

  const { setStateByObjectKeys } = useModel('bridge');

  /** 创建模板 */
  const onCreateTemplate = function(type: TEMPLATE_TYPE) {
    let state = {};
    /** 空白模板 */
    if (type === TEMPLATE_TYPE.blank) {
      state = {
        pageSchema: [],
        selectPageIndex: -1,
      };
    }
    /** 示例模板 */
    if (type === TEMPLATE_TYPE.example) {
      state = {
        pageSchema: pageSchema,
        selectPageIndex: 0,
      };
    }
    setStateByObjectKeys(state);
    history.push('/design');
    onChildrenReady(() => {
      syncState({
        payload: state,
        from: 'design',
        type: IMessageType.syncState,
      });
    });
  };

  return {
    onCreateTemplate,
  };
}
