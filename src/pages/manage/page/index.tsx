import React from 'react';
import { history, useModel, useRequest } from 'umi';
import * as service from '@/service';
import { PageHeader, Card, Pagination, Button } from 'antd';
import { IMessageType, onChildrenReady, syncState } from '@/utils/bridge';

import './index.less';

export default function() {
  const { setStateByObjectKeys } = useModel('bridge');
  const queryPageListReq = useRequest(service.queryPageList);

  const onAddPage = function() {
    const state = {
      pageId: undefined,
      pageSchema: [],
      selectPageIndex: -1,
    };
    setStateByObjectKeys(state);
    history.push('/design');
  };

  const onEditPage = function(item:any){
    const state = {
      pageId: undefined,
      pageSchema: [],
      selectPageIndex: -1,
    };
    setStateByObjectKeys(state);
    history.push({
      pathname: '/design',
      query: {
        _id: item._id,
      },
    });
  };


  return (
    <PageHeader
      className="manage-page"
      ghost={false}
      title="页面搭建"
      extra={[
        <Button key="1" type="primary" onClick={onAddPage}>
          新增
        </Button>,
      ]}
    >
      <div className="manage-page-container">
        {
          queryPageListReq.data&&  queryPageListReq.data.list.map((item:any)=>(
            <div className="manage-page-item" key={item._id}>
              <Card
                className="page-card"
                cover={
                  <img
                    className="page-add-card-img"
                    alt="example"
                    src={item.pageSchema[0]?.cover}
                  />
                }
                onClick={()=>{onEditPage(item);}}
              >
                <div className="title">输入手机号领券</div>
              </Card>
            </div>
          ))
        }
      </div>
      <div className="manage-page-pagination">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </PageHeader>
  );
}

