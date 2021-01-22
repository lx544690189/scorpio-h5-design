import { Button, Space, Tabs } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useModel, history } from 'umi';
import { doChildrenReady, IMessage, IMessageType, syncState } from '@/utils/bridge';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';
import Model from './model';

const { TabPane } = Tabs;

const ComponentDetail = function() {
  const { setStateByObjectKeys, pageSchema } = useModel('bridge');
  const { componentDetailData, setComponentDetailData, onSubmit } = Model.useContainer();
  const SchemaRef = useRef<{ getValue: () => any }>(null);

  useEffect(() => {
    registerPostmessageEventListener();
    window.onCaptureComponentOver = async function(fileName) {
      if (SchemaRef.current) {
        const generatorSchema = SchemaRef.current.getValue();
        const props = pageSchema[0].components[0].props;
        componentDetailData.cover = `https://static.lxzyl.cn/design/${fileName}`;
        await onSubmit(generatorSchema, props);
      }
    };
  }, [pageSchema]);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function() {
    window.addEventListener('message', (event) => {
      if (event.data && event.data.from === 'mobile') {
        const { payload, type } = event.data as IMessage;
        if (type === IMessageType.syncState) {
          setStateByObjectKeys(payload);
        }
        if (type === IMessageType.children_ready) {
          doChildrenReady();
        }
      }
    });
  };

  function onTabChange(key: string) {
    if (key === 'form') {
      // @ts-expect-error
      const generatorSchema = SchemaRef.current.getValue();
      setComponentDetailData({
        ...componentDetailData,
        generatorSchema,
      });
    }
  }

  async function handelSubmit() {
    syncState({
      payload: {},
      from: 'design',
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

  return (
    <div className="manage-component-detail">
      <div className="left">
        <div className="left-top"></div>
        <iframe src="/#/mobile" className="mobile" id="mobile" />
      </div>
      <div className="right">
        {/* <Spin spinning={componentDetail.loading}> */}
        <Tabs
          className="manage-component-detail-tabs"
          defaultActiveKey="1"
          onChange={onTabChange}
          tabBarExtraContent={OperationsSlot}
        >
          <TabPane tab="schema配置" key="schema">
            <Schema ref={SchemaRef} />
          </TabPane>
          <TabPane tab="表单项" key="form">
            <Form />
          </TabPane>
        </Tabs>
        {/* </Spin> */}
      </div>
    </div>
  );
};

export default function() {
  return (
    <Model.Provider>
      <ComponentDetail />
    </Model.Provider>
  );
}
