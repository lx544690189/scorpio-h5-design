import { Button, Space, Tabs } from 'antd';
import React, { useEffect, useRef } from 'react';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';
import Model from './model';
import { doChildrenReady, IMessage, IMessageType } from '@/utils/bridge';
import { useModel } from 'umi';

const { TabPane } = Tabs;

const ComponentDetail = function() {
  const { setStateByObjectKeys, pageSchema } = useModel('bridge');
  console.log('pageSchema: ', pageSchema);
  const { componentDetailData, setComponentDetailData, onSubmit } = Model.useContainer();
  const SchemaRef = useRef(null);

  useEffect(() => {
    registerPostmessageEventListener();
  }, []);

  /**
   * 监听父页面message
   */
  const registerPostmessageEventListener = function(){
    window.addEventListener('message', (event) => {
      if (event.data && event.data.from === 'mobile') {
        const { payload, type } = event.data as IMessage;
        if(type === IMessageType.syncState){
          setStateByObjectKeys(payload);
        }
        if(type === IMessageType.children_ready){
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

  async function handelSubmit(){
    // @ts-expect-error
    const generatorSchema = SchemaRef.current.getValue();
    const props = pageSchema[0].components[0].props;
    await onSubmit(generatorSchema, props);
  }

  const OperationsSlot = {
    right: (
      <Space className="manage-component-detail-tabs-extBtn">
        <Button>返回</Button>
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
