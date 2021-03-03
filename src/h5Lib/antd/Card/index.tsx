import React from 'react';
import { Card } from 'antd-mobile';
import RichText from '../../base/RichText';

export default function(props:any) {
  const {full, header, content, footer} = props;
  return (
    <Card full={full}>
      <Card.Header
        title={header?.title}
        thumb={header?.thumb}
        extra={<span>{header?.extra}</span>}
      />
      <Card.Body>
        {
          <RichText html={content}/>
        }
      </Card.Body>
      <Card.Footer content={footer?.leftContent} extra={<div>{footer?.rightContent}</div>} />
    </Card>
  );
}
