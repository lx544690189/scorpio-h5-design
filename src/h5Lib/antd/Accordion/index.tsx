import React from 'react';
import { Accordion } from 'antd-mobile';
import RichText from '../../base/RichText';

export default function(props: any) {
  const { accordion, defaultActiveKey, list = [] } = props;
  return (
    <div>
      <Accordion accordion={accordion} defaultActiveKey={defaultActiveKey}>
        {
          list.map((item:any, index: number)=>(
            <Accordion.Panel header={item.header} key={index}>
              <RichText html={item.content}/>
            </Accordion.Panel>
          ))
        }
      </Accordion>
    </div>
  );
}
