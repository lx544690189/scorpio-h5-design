import React, { useCallback, useEffect, useRef } from 'react';
import { history, useRequest } from 'umi';
import * as service from '@/service';
import './index.less';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import { useModel } from 'umi';
import { childrenModel, IMessageType, syncState } from '@/utils/bridge';
import Header from './components/Header';
import { useBoolean, useDebounce } from 'ahooks';
import Loading from '@/components/Loading';
import { Spin } from 'antd';
import { sleep } from '@/utils';
import MobileSimulator from '@/components/MobileSimulator';
import Postmate from 'Postmate';
import config from '@/config';

export default function() {
  const { setSelectComponentDomReact, scrollTop, setScrollTop } = useModel('bridge');
  const scrollTopRef = useRef<number>();
  // @ts-expect-error
  const { _id } = history.location.query;
  const { setStateByObjectKeys } = useModel('bridge');
  const queryPageDetailReq = useRequest(service.queryPageDetail, {
    manual: true,
  });
  const [loading, setLoading] = useBoolean(true);

  scrollTopRef.current = scrollTop;

  useEffect(() => {
    initData();
    return ()=>{
      window.postmate_mobile.destroy();
    };
  }, []);

  /**
   * 初始化数据、编辑页面初始数据
   */
  const initData = async function() {
    setLoading.setTrue();
    // 加载iframe、发送请求、更新state会导致页面短时间卡顿，延时进行这些任务
    await sleep(100);
    let state = {
      pageId: undefined,
      pageSchema: [],
      selectPageIndex: -1,
      selectComponentId: undefined,
    };
    if (_id) {
      const res = await queryPageDetailReq.run({
        _id,
      });
      state = {
        pageId: res._id,
        pageSchema: res.pageSchema,
        selectPageIndex: 0,
        selectComponentId: undefined,
      };
    }
    setStateByObjectKeys(state, false);
    await sleep(100);
    const handshake = new Postmate({
      container: document.getElementById('mobile-content'),
      url: `${config.base}/#/mobile`,
      name: 'mobile',
      classListArray: ['mobile'],
    });
    handshake.then((child) => {
      window.postmate_mobile = child;
      syncState({
        payload: state,
        type: IMessageType.syncState,
      });
      // 注册事件
      child.on(childrenModel.SYNC_STATE, (message) => {
        setStateByObjectKeys(message, false);
      });
      child.on(childrenModel.DOM_REACT_CHANGE, (message) => {
        setSelectComponentDomReact(message);
      });
      child.on(childrenModel.ON_SCROLL, (message) => {
        setScrollTop(message);
      });
      setLoading.setFalse();
    });
  };

  return (
    <Spin
      spinning={useDebounce(loading, { wait: 500 })}
      wrapperClassName="blur-loading"
      indicator={<Loading />}
    >
      <div className="design">
        <Header />
        <div className="side-left">
          {!loading && <SideLeft />}
        </div>
        <div className="side-right">
          {!loading && <SideRight />}
        </div>
        <div className="center">
          <MobileSimulator loading={loading}/>
        </div>
      </div>
    </Spin>
  );
}