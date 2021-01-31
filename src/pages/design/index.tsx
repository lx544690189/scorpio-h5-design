import React, { useEffect } from 'react';
import { history, useRequest } from 'umi';
import * as service from '@/service';
import './index.less';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import { useModel } from 'umi';
import { doChildrenReady, IMessage, IMessageType, onChildrenReady, syncState } from '@/utils/bridge';
import Header from './components/Header';
import { useBoolean, useDebounce } from 'ahooks';
import Loading from '@/components/Loading';
import { Spin } from 'antd';
import { sleep } from '@/utils';
import MobileSimulator from '@/components/MobileSimulator';

export default function() {
  // @ts-expect-error
  const { _id } = history.location.query;
  const { setStateByObjectKeys } = useModel('bridge');
  const queryPageDetailReq = useRequest(service.queryPageDetail, {
    manual: true,
  });
  const [loading, setLoading] = useBoolean(true);
  useEffect(() => {
    registerPostmessageEventListener();
  }, []);

  useEffect(() => {
    initData();
  }, [_id]);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function() {
    window.addEventListener('message', (event) => {
      if (event.data && event.data.from === '/mobile') {
        const { payload, type } = event.data as IMessage;
        if (type === IMessageType.syncState) {
          setStateByObjectKeys(payload, false);
        }
        if (type === IMessageType.children_ready) {
          doChildrenReady();
        }
      }
    });
  };

  /**
   * 初始化数据、编辑页面初始数据
   */
  const initData = async function() {
    setLoading.setTrue();
    onChildrenReady(() => {
      syncState({
        payload: state,
        type: IMessageType.syncState,
      });
      setLoading.setFalse();
    });
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
    // @ts-expect-error
    window.document.querySelector('#mobile').src='/#/mobile';
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