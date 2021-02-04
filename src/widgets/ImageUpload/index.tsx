import { message, Upload } from 'antd';
import React, { useEffect } from 'react';
import { ossClient } from '@/utils';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
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

  const handleDelete = function(){
    onChange(name, '');
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="picture-uploader">
      <Upload
        listType="picture-card"
        showUploadList={false}
        onChange={handleChange}
      >
        {value ? (
          <div className="picture-uploader-img-container">
            <img src={value} alt="avatar" style={{ width: '100%' }} />
          </div>
        ) : uploadButton}
      </Upload>
      {
        value && <div className="delete-img" onClick={handleDelete}><CloseOutlined /></div>
      }
    </div>

  );
}
