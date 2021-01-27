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
      if (event.data && event.data.from === 'mobile') {
        const { payload, type } = event.data as IMessage;
        console.log('--------design----------');
        console.log(payload);
        console.log('--------design----------');
        if (type === IMessageType.syncState) {
          setStateByObjectKeys(payload);
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
    setStateByObjectKeys(state);
    onChildrenReady(() => {
      syncState({
        payload: state,
        from: 'design',
        type: IMessageType.syncState,
      });
      setLoading.setFalse();
    });
    await sleep(100);
    // @ts-expect-error
    window.document.querySelector('#mobile').src='/#/mobile';
  };
  const debouncedloading = useDebounce(loading, { wait: 800 });


  return (
    <Spin
      spinning={debouncedloading}
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
          <div className="mobile-simulator">
            <div className="mobile-head-bar"></div>
            <div className="mobile-content">
              <iframe className={`mobile ${!loading && 'show'}`} id="mobile"/>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}