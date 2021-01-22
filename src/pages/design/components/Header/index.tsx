import React, { useEffect } from 'react';
import { useModel, useRequest } from 'umi';
import * as service from '@/service';
import './index.less';
import { message, Spin } from 'antd';
import { IMessageType, syncState } from '@/utils/bridge';

export default function() {
  const { pageId, pageSchema } = useModel('bridge');
  const addPageReq = useRequest(service.addPage, {
    manual: true,
  });
  const editPageReq = useRequest(service.editPage, {
    manual: true,
  });

  useEffect(() => {
    window.onCaptureComponentOver = async function(fileName) {
      if (pageId) {
        await editPageReq.run({
          _id: pageId,
          pageSchema,
          cover: `https://static.lxzyl.cn/design/${fileName}`,
        });
      } else {
        await addPageReq.run({
          pageSchema,
          cover: `https://static.lxzyl.cn/design/${fileName}`,
        });
      }
    };
  }, [pageId]);

  const onSave = async function() {
    syncState({
      payload: {},
      from: 'design',
      type: IMessageType.capture,
    });
    message.success('保存成功！');
  };

  return (
    <div className="design-header">
      <ul className="design-header-operations">
        <li>
          <i className="iconfont icon-baocun" />
          <div className="text" onClick={onSave}>保存</div>
        </li>
        <li>
          <i className="iconfont icon-shouji" />
          <div className="text">预览</div>
        </li>
        <li>
          <i className="iconfont icon-json" />
          <div className="text">导出</div>
        </li>
      </ul>
    </div>
  );
}
