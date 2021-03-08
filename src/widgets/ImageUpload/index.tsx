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
    console.log('info.file.status: ', info.file.status);
    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);
    //   const fileName = `${uuidv4()}.png`;
    //   console.log('info.file.originFileObj: ', info.file.originFileObj);
    //   await ossClient.put(`design/${fileName}`, info.file.originFileObj);
    //   onChange(name, `https://scorpio-design.lxzyl.cn/design/${fileName}`);
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
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

  const customRequest = async function(options:any){
    const fileName = `${uuidv4()}.png`;
    await ossClient.put(`design/${fileName}`, options.file);
    onChange(name, `https://scorpio-design.lxzyl.cn/design/${fileName}`);
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
