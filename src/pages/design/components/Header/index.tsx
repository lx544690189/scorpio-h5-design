import React from 'react';
import { useModel, useRequest } from 'umi';
import * as service from '@/service';
import './index.less';
import { message, Popover } from 'antd';
import { useBoolean } from 'ahooks';
import * as QRCode from 'qrcode';
import { dataURLtoFile, ossClient } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

export default function() {
  const { pageId, pageSchema, selectPageIndex } = useModel('bridge');
  const addPageReq = useRequest(service.addPage, {
    manual: true,
  });
  const editPageReq = useRequest(service.editPage, {
    manual: true,
  });
  const [visible, { toggle }] = useBoolean(false);

  const onSave = async function() {
    const selectPage = pageSchema[selectPageIndex];
    const dataURL =  selectPage.coverSnapshot;
    if (dataURL) {
      const file = dataURLtoFile(dataURL, new Date().getTime().toString());
      const fileName = `${uuidv4()}.png`;
      await ossClient.put(`design/${fileName}`, file);
      selectPage.cover = `https://static.lxzyl.cn/design/${fileName}`;
    }
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
