import React, { useState } from 'react';
import { history, useRequest } from 'umi';
import * as service from '@/service';
import { PageHeader, Card, Pagination, Button, Spin, message } from 'antd';
import * as QRCode from 'qrcode';
import config from '@/config';

import './index.less';
import moment from 'moment';

export default function() {
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  const queryPageListReq = useRequest(service.queryPageList);
  const togglePageTemplateReq = useRequest(service.togglePageTemplate, {
    manual: true,
  });

  const onAddPage = function() {
    history.push('/design');
  };

  const onEditPage = function(item:any){
    history.push({
      pathname: '/design',
      query: {
        _id: item._id,
      },
    });
  };

  const onMouseEnter = async function(pageId:string) {
    setQrcodeUrl('');
    const dataUrl = await QRCode.toDataURL(`${config.h5Base}?id=${pageId}`, {
      margin: 2,
    });
    setQrcodeUrl(dataUrl);
  };

  const toggleTemplate = async function(item:any) {
    await togglePageTemplateReq.run({
      _id: item._id,
      isTemplate: !item.isTemplate,
    });
    message.info('操作成功！');
    queryPageListReq.refresh();
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
      <Spin spinning={queryPageListReq.loading}>
        <div className="manage-page-container">
          {
            queryPageListReq.data&&  queryPageListReq.data.list.map((item:any)=>(
              <div className="manage-page-item" key={item._id}>
                <Card
                  className="page-card"
                  cover={
                    <div className="page-card-main">
                      <img
                        className="page-card-img"
                        alt="example"
                        src={item.pageSchema[0]?.cover}
                      />
                      <div
                        className="page-card-pop"
                        onMouseEnter={()=>{onMouseEnter(item._id);}}
                      >
                        <img className="page-card-pop-qrcode" src={qrcodeUrl}/>
                        <Button className="page-card-pop-btn" type="dashed" onClick={()=>{onEditPage(item);}}>编辑</Button>
                        <Button className="page-card-pop-btn" type="dashed" onClick={()=>{toggleTemplate(item);}}>{item.isTemplate ? '取消模板' : '设为模板'}</Button>
                      </div>
                    </div>
                  }
                >
                  <div className="title">{item.pageSchema[0].props.title}</div>
                  <div className="time">
                    <span className="version">V1.0</span>
                    {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                </Card>
              </div>
            ))
          }
        </div>
        {/* <div className="manage-page-pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div> */}
      </Spin>
    </PageHeader>
  );
}

