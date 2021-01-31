import { message, Upload } from 'antd';
import React from 'react';
import { ossClient } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

interface IProps {
  name?: string;
  value: string;
  onChange: (name: string | undefined, value: string) => void
}

export default function ImageUpload(props: IProps) {
  const { value, onChange, name } = props;

  const handleChange = async(info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      await ossClient.put(`design/${info.file.name}`, info.file.originFileObj);
      onChange(name, `https://static.lxzyl.cn/design/${info.file.name}`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
    >
      {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
}
