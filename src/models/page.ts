import { EVENT_TYPE } from '@/types/event';
import { postMessageToMobile } from '@/utils';
import { useState, useCallback } from 'react';
export default () => {

  const [page, setPage] = useState<{
    visible: boolean;
    pageSchema: any[];
  }>({
    visible: false,
    pageSchema: [],
  });

  // 打开页面模板弹窗
  const openCreatePageDrawer = function(){
    setPage({
      visible: true,
      pageSchema: page.pageSchema,
    });
  };

  // 关闭页面模板弹窗
  const closeCreatePageDrawer = function(){
    setPage({
      visible: false,
      pageSchema: page.pageSchema,
    });
  };

  // 新增页面
  const onCreatePage = function(pageSchema :any){
    const payload = {
      visible: false,
      pageSchema: [...page.pageSchema, pageSchema],
    };
    setPage(payload);
    postMessageToMobile({
      type: EVENT_TYPE.page_change,
      payload,
    });
  };

  return {
    page,
    setPage,
    openCreatePageDrawer,
    closeCreatePageDrawer,
    onCreatePage,
  };
};
