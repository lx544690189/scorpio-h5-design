import React from 'react';
import {  Empty, Button  } from 'antd';
import './index.less';
import CreatePage from './components/CreatePage';
import PageConfig from './components/PageConfig';
import { useModel } from 'umi';
import classnames from 'classnames';

export default function() {
  const { openCreatePageDrawer } = useModel('page');
  const { pageSchema, selectPageIndex } = useModel('bridge');

  return (
    <div className="page">
      {
        pageSchema.length === 0 ? (
          <>
            <div className="page-empty">
              <div className="page-empty-center">
                <Empty description="请先创建一个页面吧" />
                <Button type="primary" className="page-empty-new-btn" onClick={openCreatePageDrawer}>新增页面</Button>
              </div>
            </div>
          </>
        ) : (
          pageSchema.map((item, index)=>(
            <div
              key={item.config.path}
              className={classnames('page-card', {select: selectPageIndex === index})}
            >
              <img
                className="page-card-cover"
                src={item.cover ?? 'https://carpooling-1256959311.cos.ap-chengdu.myqcloud.com/d6bc039b-04ea-49ca-8ee9-a006aec7c443.png'}
              />
              <div className="title">{item.config.title}</div>
            </div>
          ))
        )
      }
      <CreatePage />
      <PageConfig />
    </div>
  );
}
