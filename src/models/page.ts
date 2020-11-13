import { EVENT_TYPE } from '@/types/event';
import { postMessageToMobile } from '@/utils';
import { useState, useCallback } from 'react';
export default () => {

  const [page, setPage] = useState<{
    createModalVisible: boolean;
    configModalVisible: boolean;
    pageSchema: any[];
    selectPageIndex: number;
  }>({
    createModalVisible: false,
    configModalVisible: false,
    pageSchema: [],
    selectPageIndex: 0,
  });

  // 打开页面模板弹窗
  const openCreatePageDrawer = function(){
    setPage({
      ...page,
      createModalVisible: true,
    });
  };

  // 关闭页面模板弹窗
  const closeCreatePageDrawer = function(){
    setPage({
      ...page,
      createModalVisible: false,
    });
  };

  // 新增页面
  const onCreatePage = function(pageSchema :any){
    const payload = {
      ...page,
      createModalVisible: false,
      configModalVisible: false,
      pageSchema: [...page.pageSchema, pageSchema],
      selectPageIndex: page.pageSchema.length,
    };
    setPage(payload);
    postMessageToMobile({
      type: EVENT_TYPE.page_change,
      payload,
    });
  };

  // 打开页面配置弹窗
  const openConfigPageDrawer = function(){
    setPage({
      ...page,
      configModalVisible: true,
    });
  };

  // 关闭页面配置弹窗
  const closeConfigPageDrawer = function(){
    setPage({
      ...page,
      configModalVisible: false,
    });
  };

  return {
    page,
    setPage,
    openCreatePageDrawer,
    closeCreatePageDrawer,
    onCreatePage,
    openConfigPageDrawer,
    closeConfigPageDrawer,
  };
};
