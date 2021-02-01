import { Button, Space, Spin, Tabs } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useModel, history } from 'umi';
import { doChildrenReady, IMessage, IMessageType, onChildrenReady, syncState } from '@/utils/bridge';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';
import Model from './model';
import Code from './components/Code';
import { useDebounce } from 'ahooks';
import Loading from '@/components/Loading';
import MobileSimulator from '@/components/MobileSimulator';

const { TabPane } = Tabs;

const ComponentDetail = function() {
  const { setStateByObjectKeys, pageSchema, selectComponent } = useModel('bridge');
  const { onSubmit, loading } = Model.useContainer();
  const SchemaRef = useRef<{ getValue: () => any }>(null);

  useEffect(() => {
    // registerPostmessageEventListener();
    window.onCaptureComponentOver = async function(fileName) {
      if (SchemaRef.current) {
        const generatorSchema = SchemaRef.current.getValue();
        selectComponent.cover = `https://static.lxzyl.cn/design/${fileName}`;
        await onSubmit(generatorSchema);
      }
    };
  }, [pageSchema]);

  /**
   * 监听父页面message
   */
  // const registerPostmessageEventListener = function() {
  //   window.addEventListener('message', (event) => {
  //     if (event.data && event.data.from === '/mobile') {
  //       const { payload, type } = event.data as IMessage;
  //       if (type === IMessageType.syncState) {
  //         setStateByObjectKeys(payload);
  //       }
  //       if (type === IMessageType.children_ready) {
  //         doChildrenReady();
  //       }
  //     }
  //   });
  // };

  function onTabChange(key: string) {
    if (key === 'form') {
      selectComponent.generatorSchema = SchemaRef.current?.getValue();
      const state = {
        pageSchema: [...pageSchema],
      };
      setStateByObjectKeys(state);
      onChildrenReady(() => {
        syncState({
          payload: state,
          type: IMessageType.syncState,
        });
      });
    }
  }

  async function handelSubmit() {
    syncState({
      payload: {},
      type: IMessageType.capture,
    });
  }

  const OperationsSlot = {
    right: (
      <Space className="manage-component-detail-tabs-extBtn">
        <Button onClick={() => history.goBack()}>返回</Button>
        <Button type="primary" onClick={handelSubmit}>保存</Button>
      </Space>
    ),
  };

  const debouncedloading = useDebounce(loading, { wait: 500 });

  return (

    <Spin
      spinning={debouncedloading}
      wrapperClassName="blur-loading"
      indicator={<Loading />}
    >
      <div className="manage-component-detail">
        <div className="left">
          <MobileSimulator/>
        </div>
        {selectComponent && <div className="right">
          <Tabs
            className="manage-component-detail-tabs"
            defaultActiveKey="1"
            onChange={onTabChange}
            tabBarExtraContent={OperationsSlot}
          >
            <TabPane tab="可视化配置" key="schema">
              <Schema ref={SchemaRef} />
            </TabPane>
            <TabPane tab="编辑schema" key="code">
              <Code />
            </TabPane>
            <TabPane tab="表单项" key="form">
              <Form />
            </TabPane>
          </Tabs>
        </div>}
      </div>
    </Spin>
  );
};

export default function() {
  return (
    <Model.Provider>
      <ComponentDetail />
    </Model.Provider>
  );
}
