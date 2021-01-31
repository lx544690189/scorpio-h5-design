import { Button, message, Upload } from 'antd';
import React, { useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import './index.less';
import { ossClient } from '@/utils';

export default function() {
  useEffect(()=>{
    //
  }, []);
  const props = {
    name: 'file',
    async onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const uploadResult = await ossClient.put(`design/${info.file.name}`, info.file.originFileObj);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props} className="aliyun-upload">
      <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
  );
}
