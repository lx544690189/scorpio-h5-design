import React, { useEffect } from 'react';
import { history, useRequest } from 'umi';
import * as service from '@/service';
import './index.less';
import SideLeft from './components/SideLeft';
import SideRight from './components/SideRight';
import { useModel } from 'umi';
import { doChildrenReady, IMessage, IMessageType, onChildrenReady, syncState } from '@/utils/bridge';
import Header from './components/Header';

export default function() {
  // @ts-expect-error
  const { _id } = history.location.query;
  const { setStateByObjectKeys } = useModel('bridge');
  const queryPageDetailReq = useRequest(service.queryPageDetail, {
    manual: true,
  });

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
    let state = {
      pageId: undefined,
      pageSchema: [],
      selectPageIndex: -1,
    };
    if (_id) {
      const res = await queryPageDetailReq.run({
        _id,
      });
      state = {
        pageId: res._id,
        pageSchema: res.pageSchema,
        selectPageIndex: 0,
      };
    }
    setStateByObjectKeys(state);
    onChildrenReady(() => {
      syncState({
        payload: state,
        from: 'design',
        type: IMessageType.syncState,
      });
    });
  };

  return (
    <div className="design">
      <Header />
      <SideLeft />
      <div className="side-right">
        <SideRight />
      </div>
      <div className="center">
        <div className="mobile-simulator">
          <div className="mobile-head-bar"></div>
          <div className="mobile-content">
            <iframe src="/#/mobile" className="mobile" id="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
}