import { message, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { ossClient } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';

function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function ImageUpload(props:any) {
  const {value, onChange, name} = props;
  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  });

  const handlePreview = async(file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = async(info:any) => {
    // onChange(name, fileList);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const uploadResult = await ossClient.put(`design/${info.file.name}`, info.file.originFileObj);
      console.log('uploadResult: ', uploadResult);
      onChange(name, info.fileList);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleCancel = function(){
    setPreview({
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="manage">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={value || []}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {value.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={preview.previewVisible}
        title={preview.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={preview.previewImage} />
      </Modal>
    </div>
  );
}
