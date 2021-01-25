import React, { useEffect } from 'react';
import { useModel, useRequest } from 'umi';
import * as service from '@/service';
import './index.less';
import { message, Popover, Spin } from 'antd';
import { IMessageType, syncState } from '@/utils/bridge';
import {useBoolean} from 'ahooks';
import * as QRCode from 'qrcode';

export default function() {
  const { pageId, pageSchema } = useModel('bridge');
  const addPageReq = useRequest(service.addPage, {
    manual: true,
  });
  const editPageReq = useRequest(service.editPage, {
    manual: true,
  });
  const [visible, {toggle}] = useBoolean(false);

  const onCaptureComponentOver = async function(fileName:string) {
    pageSchema[0].cover = `https://static.lxzyl.cn/design/${fileName}`;
    if (pageId) {
      await editPageReq.run({
        _id: pageId,
        pageSchema,
      });
    } else {
      await addPageReq.run({
        pageSchema,
      });
    }
  };

  useEffect(() => {
    window.onCaptureComponentOver = onCaptureComponentOver;
  }, [onCaptureComponentOver]);

  const onSave = async function() {
    syncState({
      payload: {},
      from: 'design',
      type: IMessageType.capture,
    });
    message.success('保存成功！');
  };

  const onOverview = function() {
    const canvas = document.getElementById('canvas');
    QRCode.toCanvas(canvas, 'sample text', function(error) {
      if (error) console.error(error);
      console.log('success!');
    });
  };

  const overviewContent = (
    <div className="overview-qrcode">

    </div>
  );

  return (
    <div className="design-header">
      <div className="design-header-operations">
        <div className="item" onClick={onSave}>
          <i className="iconfont icon-baocun" />
          <div className="text" >保存</div>
        </div>
        <Popover
          title="Title"
          trigger="click"
          visible={visible}
          onVisibleChange={toggle}
          content={overviewContent}
        >

          <div className="item">
            <i className="iconfont icon-shouji" />
            <div className="text" onClick={onOverview}>预览</div>
          </div>
        </Popover>
        <div className="item">
          <i className="iconfont icon-json" />
          <div className="text">导出</div>
        </div>
      </div>
    </div>
  );
}
