import { EVENT_TYPE } from '@/types/event';
import { postMessageToMobile } from '@/utils';
import { useState, useCallback } from 'react';
import { useModel } from 'umi';
export default () => {
  const { pageSchema, setPageSchema, selectPageIndex, setSelectPageIndex } = useModel('design');

  const [page, setPage] = useState<{
    createModalVisible: boolean;
    configModalVisible: boolean;
  }>({
    createModalVisible: false,
    configModalVisible: false,
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
  const onCreatePage = function(newPage :any){
    const newPageSchame = [...pageSchema, newPage];
    const newSelectPageIndex = selectPageIndex !== -1 ? selectPageIndex : 0;
    setPage({
      createModalVisible: false,
      configModalVisible: false,
    });
    setPageSchema(newPageSchame);
    setSelectPageIndex(newSelectPageIndex);
    postMessageToMobile({
      type: EVENT_TYPE.page_edit,
      payload: {
        pageSchema: newPageSchame,
        selectPageIndex: newSelectPageIndex,
      },
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
