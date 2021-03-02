import React from 'react';
import { Card } from 'antd-mobile';
import _601912a902574daf68578e48 from '../../601912a902574daf68578e48';

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
          <_601912a902574daf68578e48 html={content}/>
        }
      </Card.Body>
      <Card.Footer content={footer?.leftContent} extra={<div>{footer?.rightContent}</div>} />
    </Card>
  );
}
