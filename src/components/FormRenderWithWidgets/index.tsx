import React from 'react';
import FormRender, { FRProps } from 'form-render';
import ImageUpload from '@/widgets/ImageUpload';
import BraftEditor from '@/widgets/BraftEditor';
import './index.less';

export default function(props: FRProps) {

  return (
    <FormRender
      widgets={{ ImageUpload, BraftEditor }}
      {...props}
    />
  );
}
