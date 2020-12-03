import { TEMPLATE_TYPE } from '@/types';
import { history, useModel } from 'umi';
import { pageSchema } from '@/constant';
import { EVENT_TYPE } from '@/types/event';
import { onChildrenReady, postMessageToMobile } from '@/utils';

export default function useAuthModel() {

  const { setPageSchema, setSelectPageIndex } = useModel('design');

  /** 创建模板 */
  const onCreateTemplate = function(type: TEMPLATE_TYPE) {
    /** 空白模板 */
    if (type === TEMPLATE_TYPE.blank) {
      // 设置页面模板数据
      setPageSchema([]);
      // 设置默认选择的页面
      setSelectPageIndex(-1);
      history.push('/design');
    }
    /** 示例模板 */
    if (type === TEMPLATE_TYPE.example) {
      // 设置页面模板数据
      setPageSchema(pageSchema);
      // 设置默认选择的页面
      setSelectPageIndex(0);
      onChildrenReady(() => {
        postMessageToMobile({
          type: EVENT_TYPE.page_edit,
          payload: {
            pageSchema,
            selectPageIndex: 0,
          },
        });
      });
      history.push('/design');
    }
  };

  return {
    onCreateTemplate,
  };
}
