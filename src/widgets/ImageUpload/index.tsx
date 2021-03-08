import { message, Upload } from 'antd';
import React from 'react';
import { ossClient } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
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
      const fileName = `${uuidv4()}.png`;
      await ossClient.put(`design/${fileName}`, info.file.originFileObj);
      onChange(name, `https://static.lxzyl.cn/design/${fileName}`);
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
