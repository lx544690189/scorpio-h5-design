import { message, Upload } from 'antd';
import React from 'react';
import { ossClient } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';

interface IProps {
  name?: string;
  value?: string;
  onChange: (value: string) => void
}

export default function ImageUpload(props: IProps) {
  const { value, onChange } = props;
  const handleDelete = function(){
    onChange('');
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customRequest = async function(options:any){
    const fileName = `${uuidv4()}.png`;
    await ossClient.put(`design/${fileName}`, options.file);
    onChange(`https://scorpio-design.lxzyl.cn/design/${fileName}`);
    options.onSuccess(null, options.file);
  };

  return (
    <div className="picture-uploader">
      <Upload
        listType="picture-card"
        showUploadList={false}
        // onChange={handleChange}
        customRequest={customRequest}
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
