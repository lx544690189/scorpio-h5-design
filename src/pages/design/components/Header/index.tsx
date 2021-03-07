import React, { useState } from 'react';
import { useModel, useRequest, history } from 'umi';
import * as service from '@/service';
import './index.less';
import { message, Popover, Spin } from 'antd';
import { useBoolean } from 'ahooks';
import * as QRCode from 'qrcode';
import { dataURLtoFile, ossClient } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { childrenModel } from '@/utils/bridge';
import config from '@/config';

export default function() {
  const { pageId, pageSchema, selectPageIndex } = useModel('bridge');
  const addPageReq = useRequest(service.addPage, {
    manual: true,
  });
  const editPageReq = useRequest(service.editPage, {
    manual: true,
  });
  const [visible, { toggle }] = useBoolean(false);
  const [qrcodeUrl, setQrcodeUrl] = useState('');

  const save = async function() {
    const selectPage = pageSchema[selectPageIndex];
    const dataURL = await window.postmate_mobile.get(childrenModel.CAPTURE);
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
  };

  const onSave = async function() {
    if(pageSchema.length === 0){
      return message.error('请新建页面后再保存！');
    }
    await save();
    message.success('保存成功！');
  };

  const onVisibleChange = async function() {
    if(pageSchema.length === 0){
      return message.error('请新建页面后再操作！');
    }
    toggle();
    await save();
    const dataUrl = await QRCode.toDataURL(`${config.h5Base}?id=${pageId}`, {
      margin: 0,
    });
    console.log('dataUrl: ', dataUrl);
    setQrcodeUrl(dataUrl);
  };

  const overviewContent = (
    <div className="overview-qrcode">
      <img className="overview-qrcode-img" src={qrcodeUrl}/>
    </div>
  );

  return (
    <div className="design-header">
      <div className="design-header-operations">
        <div className="item" onClick={()=>{history.push('/manage/page');}}>
          <i className="iconfont icon-shouye" />
          <div className="text" >首页</div>
        </div>
        <div className="item" onClick={onSave}>
          <i className="iconfont icon-baocun" />
          <div className="text" >保存</div>
          <Spin spinning={addPageReq.loading || editPageReq.loading}>
          </Spin>
        </div>
        <Popover
          title="真机预览"
          trigger="click"
          visible={visible}
          onVisibleChange={onVisibleChange}
          content={overviewContent}
          overlayClassName="overview-qrcode-popover"
        >

          <div className="item">
            <i className="iconfont icon-shouji" />
            <div className="text">预览</div>
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
