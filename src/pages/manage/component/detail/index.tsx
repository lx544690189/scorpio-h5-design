import { Button, Space, Spin, Tabs } from 'antd';
import React, { useRef } from 'react';
import { useModel, history } from 'umi';
import { childrenModel, IMessageType, onChildrenReady, syncState } from '@/utils/bridge';
import './index.less';
import Form from './components/form';
import Schema from './components/schema';
import Model from './model';
import Code from './components/Code';
import { useDebounce } from 'ahooks';
import Loading from '@/components/Loading';
import MobileSimulator from '@/components/MobileSimulator';
import BaseLayoutConfig from '@/components/BaseLayoutConfig';
import { v4 as uuidv4 } from 'uuid';
import { dataURLtoFile, ossClient } from '@/utils';

const { TabPane } = Tabs;

const ComponentDetail = function() {
  const { setStateByObjectKeys, pageSchema, selectComponent } = useModel('bridge');
  const { onSubmit, loading } = Model.useContainer();
  const SchemaRef = useRef<{ getValue: () => any }>(null);

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
    selectComponent.generatorSchema = SchemaRef.current?.getValue();
    const dataURL = await window.postmate_mobile.get(childrenModel.CAPTURE);
    if (dataURL) {
      const file = dataURLtoFile(dataURL, new Date().getTime().toString());
      const fileName = `${uuidv4()}.png`;
      await ossClient.put(`design/${fileName}`, file);
      selectComponent.cover = `https://scorpio-design.lxzyl.cn/design/${fileName}`;
    }
    onSubmit();
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
          <MobileSimulator loading={loading}/>
        </div>
        {selectComponent && <div className="right">
          <Tabs
            className="manage-component-detail-tabs"
            defaultActiveKey="1"
            onChange={onTabChange}
            tabBarExtraContent={OperationsSlot}
          >
            <TabPane tab="schema可视化配置" key="schema">
              <Schema ref={SchemaRef} />
            </TabPane>
            <TabPane tab="schema手动编辑" key="code">
              <Code />
            </TabPane>
            <TabPane tab="组件属性配置" key="form">
              <Form />
            </TabPane>
            <TabPane tab="容器属性配置" key="container">
              <BaseLayoutConfig />
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
